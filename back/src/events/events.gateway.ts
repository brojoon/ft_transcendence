import { BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Connect } from 'src/entities/Connect';
import { History } from 'src/entities/History';
import { Dmcontent } from 'src/entities/Dmcontent';
import initData from 'src/game/gameInit';
import { gameMap } from 'src/game/gameMap';
import { Repository } from 'typeorm';
import users from './matchInfo';
import { onGameMap, onGameMap_gameId } from './onGameMap';
import { onlineMap } from './onlineMap';

@WebSocketGateway({ cors: true })
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    @InjectRepository(Connect) private connectRepository: Repository<Connect>,
    @InjectRepository(History) private historyRepository: Repository<History>,
    @InjectRepository(Dmcontent) private dmcontentRepository: Repository<Dmcontent>,
  ) { }

  @WebSocketServer() public server: Server;

  @SubscribeMessage('login')
  async handleLogin(
    @MessageBody() data: { userId: string; username: string, Dms: number[], channels: number[] },
    @ConnectedSocket() socket: Socket) {

    onlineMap[socket.id] = { userId: data.userId, username: data.username };
    console.log(`login : ${socket.id}, ${onlineMap[socket.id].userId}`);
    socket.join("all");
    socket.emit('onlineList', Object.values(onlineMap));
    socket.to("all").emit('onlineList', Object.values(onlineMap));
    socket.join(`${data.userId}`);
    socket.emit('onGameList', onGameMap);
    socket.to("all").emit('onGameList', onGameMap);
    data.Dms.forEach((dm) => {
      socket.join(`dm-${dm}`);
    });
    data.channels.forEach((channel) => {
      socket.join(`channel-${channel}`);
    });
  }

  afterInit(server: Server): any { }

  async handleConnection(@ConnectedSocket() socket: Socket) { }

  async handleDisconnect(@ConnectedSocket() socket: Socket) {
    if (onlineMap[socket.id] !== undefined) {
      console.log(`logout : ${socket.id}, ${onlineMap[socket.id].userId}`);

      // matching 초기화
      if (users.playerOne === onlineMap[socket.id].userId)
        users.playerOne = null;
      else if (users.playerTwo === onlineMap[socket.id].userId) {
        users.playerOne = null;
        users.playerTwo = null;
      }
      // onGameList remove
      let gameId;
      if (onGameMap[onlineMap[socket.id].userId] !== undefined) {
        gameId = onGameMap[onlineMap[socket.id].userId];
        delete onGameMap[onlineMap[socket.id].userId];
        socket.emit('onGameList', onGameMap);
        socket.to("all").emit('onGameList', onGameMap);
      }
      if (onGameMap_gameId[gameId] !== undefined) {
        // player 나갈 때마다 하나씩 제거
        onGameMap_gameId[gameId].forEach(function (item, index, arr) {
          if (item === onlineMap[socket.id].userId) {
            onGameMap_gameId[gameId].splice(index, 1);
            if (onGameMap_gameId[gameId].length === 0) {
              delete onGameMap_gameId[gameId];
            }
          }
        });
      }

      // player1, player2 둘다 없으면 history state 2로만들고 dm에 상태도 2로 만듬
      // 그리고 dm에 신호주기?
      let history = await this.historyRepository.findOne({ id: gameId });
      if (history) {
        if (history.state === 1 && onGameMap_gameId[gameId] !== undefined) {
          let num = 0;
          onGameMap_gameId[gameId].forEach(function (item, index, arr) {
            if (item === history.userId1 || item === history.userId2) {
              num++;
            }
          });
          if (num === 0) {
            clearInterval(gameMap[gameId].interval);
            await this.historyRepository.update({ id: gameId }, { state: 2 })
            await this.dmcontentRepository.update({ historyId: gameId }, { match: 2 })
            socket.to(`game-${gameId}`).emit("end", null);
            delete gameMap[gameId];
          }
        } else if (history.state === 1 && onGameMap_gameId[gameId] === undefined) {
          clearInterval(gameMap[gameId].interval);
          await this.historyRepository.update({ id: gameId }, { state: 2 })
          await this.dmcontentRepository.update({ historyId: gameId }, { match: 2 })
          socket.to(`game-${gameId}`).emit("end", null);
          delete gameMap[gameId];
        }
      }
      delete onlineMap[socket.id];
      // 접속상태 업데이트
      socket.to("all").emit('onlineList', Object.values(onlineMap));
    }
  }

  //////////////////////////////////////////////////////////////////////////
  //////////////////////////game 관련////////////////////////////////////////
  @SubscribeMessage('game')
  async gamejoin(
    @MessageBody() data: { gameId: number, player: string, player1Ready: number, player2Ready: number },
    @ConnectedSocket() socket: Socket) {
    if (data.player !== "" && gameMap[data.gameId] === undefined) {
      // gameMap[data.gameId] = initData;
      gameMap[data.gameId] = {
        interval: null,
        player_one_point: 0,
        player_two_point: 0,
        player_one_ready: 0,
        player_two_ready: 0,
        game_map: 0,
        game_count: 0,
        game_set: 5,
        random_map: 0,
        game_state: 0,
        game_start: 0,
        complete_game_set: 0,
        length: 3,
        bar_seed: 30,
        ball_x: 500,
        ball_y: 250,
        player_one_y: 200,
        player_two_y: 200,
        interval_time: 15
      }
    }
    socket.join(`game-${data.gameId}`);
    if (gameMap[data.gameId].game_start === 0) {
      gameMap[data.gameId].player_one_ready = data.player1Ready;
      gameMap[data.gameId].player_two_ready = data.player2Ready;
      this.server.to(`game-${data.gameId}`).emit('ready', {
        player1: gameMap[data.gameId].player_one_ready,
        player2: gameMap[data.gameId].player_two_ready,
      });
    }
  }

  @SubscribeMessage('onGame')
  async onGame(
    @MessageBody() data: { gameId: number, player: string },
    @ConnectedSocket() socket: Socket) {
    if (onGameMap_gameId[data.gameId] === undefined) {
      let player_arr = [];
      onGameMap_gameId[data.gameId] = player_arr;
    }
    let check = 0;
    onGameMap_gameId[data.gameId].forEach(function (item, index, arr) {
      if (item === data.player)
        check = 1;
    });
    if (check === 0)
      onGameMap_gameId[data.gameId].push(data.player);
    onGameMap[data.player] = data.gameId;
    socket.emit('onGameList', onGameMap);
    socket.to("all").emit('onGameList', onGameMap);
    // 프런트에서 접속중일경우 onGame 시도 못하게
  }

  @SubscribeMessage('offGame')
  async offGame(
    @MessageBody() data: { gameId: number, player: string },
    @ConnectedSocket() socket: Socket) {
    // onGameMap_gameId //
    if (onGameMap_gameId[data.gameId] !== undefined) {
      // player 나갈 때마다 하나씩 제거
      onGameMap_gameId[data.gameId].forEach(function (item, index, arr) {
        if (item === data.player) {
          onGameMap_gameId[data.gameId].splice(index, 1);
          if (onGameMap_gameId[data.gameId].length === 0) {
            delete onGameMap_gameId[data.gameId];
          }
        }
      });
    }
    // player1, player2 둘다 없으면 history state 2로만들고 dm에 상태도 2로 만듬
    // 그리고 dm에 신호주기?
    let history = await this.historyRepository.findOne({ id: data.gameId });
    if (history) {
      if (history.state === 1 && onGameMap_gameId[data.gameId] !== undefined) {
        let num = 0;
        onGameMap_gameId[data.gameId].forEach(function (item, index, arr) {
          if (item === history.userId1 || item === history.userId2) {
            num++;
          }
        });
        if (num === 0) {
          clearInterval(gameMap[data.gameId].interval);
          await this.historyRepository.update({ id: data.gameId }, { state: 2 })
          await this.dmcontentRepository.update({ historyId: data.gameId }, { match: 2 })
          socket.to(`game-${data.gameId}`).emit("end", null);
          delete gameMap[data.gameId];
        }
      } else if (history.state === 1 && onGameMap_gameId[data.gameId] === undefined) {
        clearInterval(gameMap[data.gameId].interval);
        await this.historyRepository.update({ id: data.gameId }, { state: 2 })
        await this.dmcontentRepository.update({ historyId: data.gameId }, { match: 2 })
        socket.to(`game-${data.gameId}`).emit("end", null);
        delete gameMap[data.gameId];
      }
    }
    // onGameMap //
    if (onGameMap[data.player] !== undefined) {
      delete onGameMap[data.player];
      socket.emit('onGameList', onGameMap);
      socket.to("all").emit('onGameList', onGameMap);
    }
  }

  @SubscribeMessage('gameCheck')
  async gameCheck(
    @MessageBody() data: { gameId: number },
    @ConnectedSocket() socket: Socket) {
    socket.join(`game-${data.gameId}`);
    if (gameMap[data.gameId] === undefined) {
      this.server.to(`game-${data.gameId}`).emit('gameStart', {
        gameStart: 0
      });
    }
    else {
      this.server.to(`game-${data.gameId}`).emit('gameStart', {
        gameStart: gameMap[data.gameId].game_start
      });
      if (gameMap[data.gameId].game_start === 1) {
        this.server.to(`game-${data.gameId}`).emit('gameMapCheck', { game_map: gameMap[data.gameId].game_map });
      }
    }
  }

  @SubscribeMessage('matching')
  async gameMatch(
    @MessageBody() data: { userId: string, gameId: number },
    @ConnectedSocket() socket: Socket) {
    socket.join('match');

    if ((users.playerOne === null && data.gameId === 0) ||
      (users.playerOne !== null && users.playerTwo !== null && data.gameId === 0)) {
      users.playerOne = data.userId;
      users.playerOne_socet = socket;
      users.playerTwo = null;
      users.playerTwo_socet = null;
    } else if (users.playerTwo === null && users.playerOne !== data.userId && data.gameId === 0) {
      users.playerTwo = data.userId;
      users.playerTwo_socet = socket;
      const matched = {
        playerOne: users.playerOne,
        playerTwo: users.playerTwo,
        gameId: 0
      }
      this.server.to('match').emit('matched', matched)
    } else if (data.gameId !== 0) {
      const matched = {
        playerOne: users.playerOne,
        playerTwo: users.playerTwo,
        gameId: data.gameId
      }
      this.server.to('match').emit('matched', matched)
      users.playerOne_socet.leave('match');
      users.playerTwo_socet.leave('match');
      users.playerOne = null;
      users.playerTwo = null;
      users.playerOne_socet = null;
      users.playerTwo_socet = null;
    }
  }

  @SubscribeMessage('outMatching')
  async outMatching(
    @MessageBody() data: { userId: string },
    @ConnectedSocket() socket: Socket) {

    if (users.playerOne === data.userId && users.playerTwo === null) {
      users.playerOne = null;
      users.playerOne_socet = null;
      socket.leave('match')
    }
  }

  @SubscribeMessage('gamePoint')
  async gamePoint(@MessageBody() data: { gameId: number, user1Point: number, user2Point: number }) {
    if (gameMap[data.gameId] !== undefined) {
      gameMap[data.gameId].player_one_point = data.user1Point;
      gameMap[data.gameId].player_two_point = data.user2Point;
      this.server.to(`game-${data.gameId}`).emit('point', {
        player1: data.user1Point,
        player2: data.user2Point,
      });
    }
  }

  @SubscribeMessage('gameReady')  //userId 필요 없음
  async gameReady(@MessageBody() data: { gameId: number, player: number, userId: string }) {
    try {
      if (gameMap[data.gameId] !== undefined) {
        if (data.player === 1) {
          gameMap[data.gameId].player_one_ready = 1;
        } else if (data.player === 2) {
          gameMap[data.gameId].player_two_ready = 1;
        }
        this.server.to(`game-${data.gameId}`).emit('ready', {
          player1: gameMap[data.gameId].player_one_ready,
          player2: gameMap[data.gameId].player_two_ready,
        });
      }
    } catch (error) {
      throw new BadRequestException("Ready 정보 업데이트 실패");
    }
  }

  @SubscribeMessage('changeGameSet')
  async changeGameSet(@MessageBody() data: {
    gameId: number,
    speed: number,
    set: number,
    map: number,
    random: number,
    check: string
  }) {
    try {
      if (gameMap[data.gameId] !== undefined) {
        if (data.check === undefined) {
          gameMap[data.gameId].length = data.speed;
          gameMap[data.gameId].game_set = data.set;
          gameMap[data.gameId].game_map = data.map;
          gameMap[data.gameId].random_map = data.random;
        }
        this.server.to(`game-${data.gameId}`).emit('gameSet', {
          length: gameMap[data.gameId].length,
          game_set: gameMap[data.gameId].game_set,
          game_map: gameMap[data.gameId].game_map,
          random_map: gameMap[data.gameId].random_map,
        });
      }
    } catch (error) {
      throw new BadRequestException("changeGameSet 실패")
    }
  }

  @SubscribeMessage('player_one_up')
  async playerOneUP(@MessageBody() data: { game: number }) {
    if (gameMap[data.game] !== undefined && gameMap[data.game].player_one_y > -50) {
      gameMap[data.game].player_one_y -= gameMap[data.game].bar_seed;
      this.server.to(`game-${data.game}`).emit('player_one', { player_one_y: parseInt(gameMap[data.game].player_one_y) });
    }
  }

  @SubscribeMessage('player_one_down')
  async playerOneDown(@MessageBody() data: { game: number }) {
    if (gameMap[data.game] !== undefined && gameMap[data.game].player_one_y < 450) {
      gameMap[data.game].player_one_y += gameMap[data.game].bar_seed;
      this.server.to(`game-${data.game}`).emit('player_one', { player_one_y: parseInt(gameMap[data.game].player_one_y) });
    }
  }

  @SubscribeMessage('player_two_up')
  async playerTwoUP(@MessageBody() data: { game: number }) {
    if (gameMap[data.game] !== undefined && gameMap[data.game].player_two_y > -50) {
      gameMap[data.game].player_two_y -= gameMap[data.game].bar_seed;
      this.server.to(`game-${data.game}`).emit('player_two', { player_two_y: parseInt(gameMap[data.game].player_two_y) });
    }
  }

  @SubscribeMessage('player_two_down')
  async playerTwoDown(@MessageBody() data: { game: number }) {
    if (gameMap[data.game] !== undefined && gameMap[data.game].player_two_y < 450) {
      gameMap[data.game].player_two_y += gameMap[data.game].bar_seed;
      this.server.to(`game-${data.game}`).emit('player_two', { player_two_y: parseInt(gameMap[data.game].player_two_y) });
    }
  }
}

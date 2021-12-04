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
  ) { }

  @WebSocketServer() public server: Server;

  @SubscribeMessage('login')
  async handleLogin(
    @MessageBody() data: { userId: string; username: string, Dms: number[], channels: number[] },
    @ConnectedSocket() socket: Socket ){

    onlineMap[socket.id] = { userId:data.userId, username:data.username };
    console.log(`login : ${socket.id}, ${onlineMap[socket.id].userId}`);
    try{
      await this.connectRepository.createQueryBuilder()
          .update()
          .set({ state: true })
          .where('userId = :userId', {userId: onlineMap[socket.id].userId})
          .execute()
    }catch{
      throw new BadRequestException('접속상태 업뎃 실패');
    }
    socket.emit('onlineList', Object.values(onlineMap));
    socket.join(`${data.userId}`);
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
    console.log(`logout : ${socket.id}, ${onlineMap[socket.id].userId}`);
    // matching 초기화
    if (users.playerOne === onlineMap[socket.id].userId)
      users.playerOne = null;
    else if (users.playerTwo === onlineMap[socket.id].userId) {
      users.playerOne = null;
      users.playerTwo = null;
    }
    // onGameList remove
    if (onGameMap[onlineMap[socket.id].userId] !== undefined) {
      delete onGameMap[onlineMap[socket.id].userId];
      socket.emit('onGameList', Object.values(onGameMap));
    }
    onGameMap_gameId.forEach(function (value, key, mapObjec){
      value.forEach(function (item, index, arr) {
        if (item === onlineMap[socket.id].userId){
          onGameMap_gameId[key].splice(index, 1);
          //상태 체크하고 그게임방 player1 player2둘다 없으면 게임 종료
          //dm쪽 history쪽 둘다 완료 만들기 dm쪽 메세지에 업뎃은 어케 하지?
          //history쪽 승패는 없이 그대로
          if (onGameMap_gameId[key].length === 0)
            delete onGameMap_gameId[key];
          socket.emit('onGameList_gameId', Object.values(onGameMap));
        }
      });
    });
    // connectDB update => false
    try{
      let connectNum = 0;
      Object.keys(onlineMap).forEach(function(v){
        if (onlineMap[v].userId === onlineMap[socket.id].userId)
          ++connectNum;
      })
      if (connectNum === 1) {
        await this.connectRepository.createQueryBuilder()
        .update()
        .set({ state: false })
        .where('userId = :userId', {userId: onlineMap[socket.id].userId})
        .execute()
      }
    } catch (error) {
      throw new BadRequestException('접속상태 업뎃 실패');
    }
    delete onlineMap[socket.id];
    // 접속상태 업데이트
    socket.emit('onlineList', Object.values(onlineMap));
  }

  //////////////////////////////////////////////////////////////////////////
  //////////////////////////game 관련////////////////////////////////////////
  @SubscribeMessage('game')
  async gamejoin(
    @MessageBody() data: {gameId: number, player: string, player1Ready: number, player2Ready: number},
    @ConnectedSocket() socket: Socket ){
    if (data.player !=="" && gameMap[data.gameId] === undefined) {
      gameMap[data.gameId] = initData;
    }
    gameMap[data.gameId].player_one_ready = data.player1Ready;
    gameMap[data.gameId].player_two_ready = data.player2Ready;
    socket.join(`game-${data.gameId}`);
    this.server.to(`game-${data.gameId}`).emit('ready', {
      player1: gameMap[data.gameId].player_one_ready,
      player2: gameMap[data.gameId].player_two_ready, 
    });
  }

  @SubscribeMessage('onGame')
  async onGame(
    @MessageBody() data: {gameId: number, player: string},
    @ConnectedSocket() socket: Socket ){
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
    socket.emit('onGameList_gameId', Object.values(onGameMap_gameId));
    socket.emit('onGameList', Object.values(onGameMap));
  }

  @SubscribeMessage('offGame')
  async offGame(
    @MessageBody() data: {gameId: number, player: string},
    @ConnectedSocket() socket: Socket ){
    if (onGameMap_gameId[data.gameId] !== undefined) {
      onGameMap_gameId[data.gameId].forEach(function (item, index, arr) {
        if (item === data.player){
          onGameMap_gameId[data.gameId].splice(index, 1);
          //상태 체크하고 그게임방 player1 player2둘다 없으면 게임 종료
          //dm쪽 history쪽 둘다 완료 만들기 dm쪽 메세지에 업뎃은 어케 하지?
          //history쪽 승패는 없이 그대로
          if (onGameMap_gameId[data.gameId].length === 0) {
            delete onGameMap_gameId[data.gameId]; 
          }
          socket.emit('onGameList_gameId', Object.values(onGameMap_gameId));
        }
      });
    }
    if (onGameMap[data.player] !== undefined) {
      delete onGameMap[data.player];
      socket.emit('onGameList', Object.values(onGameMap));
    }
  }

  @SubscribeMessage('gameCheck')
  async gameCheck(
    @MessageBody() data: {gameId: number}){
    this.server.to(`game-${data.gameId}`).emit('gameStart', {
      gameStart: gameMap[data.gameId].game_start
    });      
  }

  @SubscribeMessage('matching')
  async gameMatch(
    @MessageBody() data: {userId: string, gameId: number},
    @ConnectedSocket() socket: Socket ){
    socket.join('match');
    if (users.playerOne === null && data.gameId === 0) {
      users.playerOne = data.userId;
      users.playerOne_socet = socket;
    } else if (users.playerTwo === null && users.playerOne !== data.userId && data.gameId === 0) {
      users.playerTwo = data.userId;
      users.playerTwo_socet = socket;
      const matched = {
        playerOne: users.playerOne,
        playerTwo: users.playerTwo,
        gameId: 0
      }
      this.server.to('match').emit('matched', matched)
    } else if ( data.gameId !== 0){
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

  @SubscribeMessage('gamePoint')
  async gamePoint(@MessageBody() data: {gameId: number, user1Point: number, user2Point: number}){
    gameMap[data.gameId].player_one_point = data.user1Point;
    gameMap[data.gameId].player_two_point = data.user2Point;
    this.server.to(`game-${data.gameId}`).emit('point', {
      player1: data.user1Point,
      player2: data.user2Point, 
    });
  }

  @SubscribeMessage('gameReady')  //userId 필요 없음
  async gameReady(@MessageBody() data: {gameId: number, player: number, userId: string}){
    try {
      if (data.player === 1) {
        gameMap[data.gameId].player_one_ready = 1;
      } else if (data.player === 2) {
        gameMap[data.gameId].player_two_ready = 1;
      }
      this.server.to(`game-${data.gameId}`).emit('ready', {
        player1: gameMap[data.gameId].player_one_ready,
        player2: gameMap[data.gameId].player_two_ready, 
      });      
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
    }){
    try {
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
    } catch (error) {
      throw new BadRequestException("changeGameSet 실패")
    }
  }

  @SubscribeMessage('player_one_up')
  async playerOneUP(@MessageBody() data: { game: number }) {
    if (gameMap[data.game].player_one_y > -50){
      gameMap[data.game].player_one_y -= gameMap[data.game].bar_seed;
      const playerInfo = { player_one_y: gameMap[data.game].player_one_y };
      this.server.to(`game-${data.game}`).emit('player_one', playerInfo);
    }  
  }

  @SubscribeMessage('player_one_down')
  async playerOneDown(@MessageBody() data: { game: number }) {
    if (gameMap[data.game].player_one_y < 450){
      gameMap[data.game].player_one_y += gameMap[data.game].bar_seed;
      const playerInfo = { player_one_y: gameMap[data.game].player_one_y };
      this.server.to(`game-${data.game}`).emit('player_one', playerInfo);
    }
  }

  @SubscribeMessage('player_two_up')
  async playerTwoUP(@MessageBody() data: { game: number }) {
    if (gameMap[data.game].player_two_y > -50){
      gameMap[data.game].player_two_y -= gameMap[data.game].bar_seed;
      const playerInfo = { player_two_y: gameMap[data.game].player_two_y };
      this.server.to(`game-${data.game}`).emit('player_two', playerInfo);
    }
  }
  
  @SubscribeMessage('player_two_down')
  async playerTwoDown(@MessageBody() data: { game: number }) {
    if (gameMap[data.game].player_two_y < 450){
      gameMap[data.game].player_two_y += gameMap[data.game].bar_seed;
      const playerInfo = { player_two_y: gameMap[data.game].player_two_y };
      this.server.to(`game-${data.game}`).emit('player_two', playerInfo);
    }
  }
}



        // await this.historyRepository.createQueryBuilder()
        //   .update()
        //   .set({ playerOneJoin: 1 })
        //   .where('id = :id AND userId1 = :userId', {id: data.gameId, userId: data.userId})
        //   .execute()
        // await this.historyRepository.createQueryBuilder()
        //   .update()
        //   .set({ playerTwoJoin: 1 })
        //   .where('id = :id AND userId2 = :userId', {id: data.gameId, userId: data.userId})
        //   .execute()

  // try{
    //   const result1 = await this.historyRepository.findOne({userId1: onlineMap[socket.id].userId, playerOneJoin: 1})
    //   const result2 = await this.historyRepository.findOne({userId2: onlineMap[socket.id].userId, playerTwoJoin: 1})
    //   if (result1) {
    //     await this.historyRepository.createQueryBuilder()
    //       .update()
    //       .set({ playerOneJoin: 0 })
    //       .where('userId1 = :userId AND playerOneJoin = :num', {userId: onlineMap[socket.id].userId, num: 1})
    //       .execute();
    //     if (result1.state != 2 && gameMap[result1.id] != undefined) {
    //       gameMap[result1.id].player_one_ready = 0;
    //       this.server.to(`game-${result1.id}`).emit('ready', {
    //         player1: gameMap[result1.id].player_one_ready,
    //         player2: gameMap[result1.id].player_two_ready
    //       });
    //     }
    //   }
    //   if (result2) {
    //     await this.historyRepository.createQueryBuilder()
    //       .update()
    //       .set({ playerTwoJoin: 0 })
    //       .where('userId2 = :userId AND playerTwoJoin = :num', {userId: onlineMap[socket.id].userId, num: 1})
    //       .execute();
    //     if (result2.state != 2 && gameMap[result2.id] != undefined) {
    //       gameMap[result2.id].player_two_ready = 0;
    //       this.server.to(`game-${result2.id}`).emit('ready', {
    //         player1: gameMap[result2.id].player_one_ready,
    //         player2: gameMap[result2.id].player_two_ready 
    //       });
    //     }
    //   }   
    // } catch (error) {
    //   throw new BadRequestException('레디 0 실패');
    // }
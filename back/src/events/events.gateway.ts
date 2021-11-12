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
import initData from 'src/game/gameInit';
import { gameMap } from 'src/game/gameMap';
import { Repository } from 'typeorm';
import users from './matchInfo';
import { onlineMap } from './onlineMap';

@WebSocketGateway({ cors: true })
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    @InjectRepository(Connect) private connectRepository: Repository<Connect>,
  ) { }

  @WebSocketServer() public server: Server;

  @SubscribeMessage('login')
  async handleLogin(
    @MessageBody() data: { userId: string; Dms: number[], channels: number[] },
    @ConnectedSocket() socket: Socket ){
    console.log('login', socket.id);
    onlineMap[socket.id] = data.userId;
    try{
      await this.connectRepository.createQueryBuilder()
          .update()
          .set({ state: true })
          .where('userId = :userId', {userId: onlineMap[socket.id]})
          .execute()
    }catch{
      throw new BadRequestException('접속상태 업뎃 실패');
    }
    socket.emit('onlineList', Object.values(onlineMap));
    data.Dms.forEach((dm) => {
      socket.join(`dm-${dm}`);
    });
    data.channels.forEach((channel) => {
      socket.join(`channel-${channel}`);
    });
  }

  afterInit(server: Server): any {
    console.log('init');
  }

  async handleConnection(@ConnectedSocket() socket: Socket) {
    console.log(`connected : ${socket.id}`);
  }

  async handleDisconnect(@ConnectedSocket() socket: Socket) {
    // 게임 접속중이면 0으로 바꿔주고 소켓도 끈어줘야함
    console.log(`disconnected : ${socket.id}`);  
    if (users.playerOne === onlineMap[socket.id])
      users.playerOne = null;
    else if (users.playerTwo === onlineMap[socket.id]) {
      users.playerOne = null;
      users.playerTwo = null;
    }
    socket.emit('onlineList', Object.values(onlineMap));
    try{
      await this.connectRepository.createQueryBuilder()
          .update()
          .set({ state: false })
          .where('userId = :userId', {userId: onlineMap[socket.id]})
          .execute()
    }catch{
      throw new BadRequestException('접속상태 업뎃 실패');
    }
    delete onlineMap[socket.id];
  }

  @SubscribeMessage('game')
  async gamejoin(
    @MessageBody() data: {gameId: number, player: string, user1Point: number, user2Point: number},
    @ConnectedSocket() socket: Socket ){
    console.log("gameroom join", data.gameId, socket.id);
    if (data.player === "playerOne") {
      gameMap[data.gameId] = initData;
      gameMap[data.gameId].player_one_point = data.user1Point;
      gameMap[data.gameId].player_two_point = data.user2Point;
    }
    socket.join(`game-${data.gameId}`);
  }

  @SubscribeMessage('matching')
  async gameMatch(
    @MessageBody() data: {userId: string, gameId: number},
    @ConnectedSocket() socket: Socket ){
    console.log("매치버튼", data.userId);
    socket.join('match');
    if (users.playerOne === null && data.gameId === 0) {
      console.log("매치1");
      users.playerOne = data.userId;
      users.playerOne_socet = socket;
    } else if (users.playerTwo === null && users.playerOne !== data.userId && data.gameId === 0) {
      console.log("매치2");
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

  @SubscribeMessage('changeGameSet')
  async changeGameSet(@MessageBody() data: {game: number, speed: number, set: number, map: number, random: number }){
    gameMap[data.game].length = data.speed;
    gameMap[data.game].game_set = data.set;
    gameMap[data.game].game_map = data.map;
    gameMap[data.game].random_map = data.random;
    this.server.to(`game-${data.game}`).emit('gameSet', {
      length: data.speed,
      game_set: data.set, 
      game_map: data.map, 
      random_map: data.random,
    });
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

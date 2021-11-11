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

  @SubscribeMessage('game')
  async gamejoin(
    @MessageBody() data: {game: number},
    @ConnectedSocket() socket: Socket ){
    console.log("gameroom join", data.game, socket.id);
    gameMap[data.game] = initData;
    socket.join(`game-${data.game}`);
  }

  @SubscribeMessage('changeGameSet')
  async changeGameSet(@MessageBody() data: {game: number, player1:number, player2:number, speed: number, set: number, map: number, random: number }){
    gameMap[data.game].player_one_ready = data.player1;
    gameMap[data.game].player_two_ready = data.player2;
    gameMap[data.game].length = data.speed;
    gameMap[data.game].game_set = data.set;
    gameMap[data.game].game_map = data.map;
    gameMap[data.game].random_map = data.random;
    console.log(gameMap[data.game].game_map, gameMap[data.game].player_one_ready, gameMap[data.game].player_two_ready);
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

  async handleConnection(@ConnectedSocket() socket: Socket) {
    console.log(`connected : ${socket.id}`);
  }

  async handleDisconnect(@ConnectedSocket() socket: Socket) {
    console.log(`disconnected : ${socket.id}`);
    delete onlineMap[socket.id];
    //socket.leave(`game-1`);
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
  }
}

import { ForbiddenException } from '@nestjs/common';
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
  
  @SubscribeMessage('player_one_up')
  async playerOneUP(@MessageBody() data: { game: number }){
    if (gameMap[data.game].player_one_y > -50)
      gameMap[data.game].player_one_y -= gameMap[data.game].bar_seed;
  }

  @SubscribeMessage('player_one_down')
  async playerOneDown(@MessageBody() data: { game: number }){
    if (gameMap[data.game].player_one_y < 450)
      gameMap[data.game].player_one_y += gameMap[data.game].bar_seed;
  }

  @SubscribeMessage('player_two_up')
  async playerTwoUP(@MessageBody() data: { game: number }){
    if (gameMap[data.game].player_two_y > -50)
      gameMap[data.game].player_two_y -= gameMap[data.game].bar_seed;
  }

  @SubscribeMessage('player_two_down')
  async playerTwoDown(@MessageBody() data: { game: number }){
    if (gameMap[data.game].player_two_y < 450)
      gameMap[data.game].player_two_y += gameMap[data.game].bar_seed;
  }

  async handleConnection(@ConnectedSocket() socket: Socket) {
    console.log(`connected : ${socket.id}`);
    // try{
    //   await this.connectRepository.createQueryBuilder()
    //       .update()
    //       .set({ state: true })
    //       .where('userId = :userId', {userId: onlineMap[socket.id]})
    //       .execute()
    // }catch{
    //   throw new ForbiddenException('접속상태 업뎃 실패');
    // }
  }

  async handleDisconnect(@ConnectedSocket() socket: Socket) {
    console.log(`disconnected : ${socket.id}`);
    delete onlineMap[socket.id];
    socket.leave(`game-1`);
    socket.emit('onlineList', Object.values(onlineMap));
    // try{
    //   await this.connectRepository.createQueryBuilder()
    //       .update()
    //       .set({ state: false })
    //       .where('userId = :userId', {userId: onlineMap[socket.id]})
    //       .execute()
    // }catch{
    //   throw new ForbiddenException('접속상태 업뎃 실패');
    // }
  }
}

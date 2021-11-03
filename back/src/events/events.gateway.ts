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
    socket.join(`game-${data.game}`);
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

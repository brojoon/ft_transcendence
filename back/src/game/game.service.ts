import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConnectedSocket, MessageBody, SubscribeMessage } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { History } from 'src/entities/History';
import { EventsGateway } from 'src/events/events.gateway';
import { Repository } from 'typeorm';
import { gameMap } from './gameMap';

const data ={
  interval: null,
  player_one_point: 0,
  player_two_point: 0,
  ball_x: 500,
  ball_y: 250,
  ball_move_x: 2,
  ball_move_y: 2,
  play_one_y: 200,
  play_two_y: 200
}

@Injectable()
export class GameService {
  constructor(
    //@InjectRepository(History) private historyRepository: Repository<History>,
    public eventsGateway:EventsGateway
  ) {}

  getHello(gameId: number){
    gameMap[gameId] = data;
    gameMap[gameId].interval = setInterval(this.moveCircle2.bind(this, gameId), 10);
  }

  // moveCircle() {
  //   data.ball_x += data.ball_move_x;
  //   data.ball_y += data.ball_move_y;
  //   console.log("가는중");
  //   this.eventsGateway.server.to("game-1").emit("welcome", data);  
  //   if (data.ball_y + 5 > 500) {
  //     data.ball_move_y *= -1;
  //   }
  //   if (data.ball_x - 10 >= 1000) {
  //     clearInterval(info.interval);
  //     data.ball_x = 500;
  //     data.ball_y = 250;
  //     data.ball_move_x = 2;
  //     data.ball_move_y = 2;
  //     console.log("중지");
  //   }
  // }

  @SubscribeMessage('player_one')
  async playerOne(@MessageBody() getdata: { player_one: number }){
    data.play_one_y += getdata.player_one;
  }

  @SubscribeMessage('player_two')
  async playerTwo(@MessageBody() getdata: { player_two: number }){
    data.play_one_y += getdata.player_two;
  }
}

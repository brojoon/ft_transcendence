import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { History } from 'src/entities/History';
import { EventsGateway } from 'src/events/events.gateway';
import { Repository } from 'typeorm';
import initData from './gameInit';
import { gameMap } from './gameMap';




@Injectable()
export class GameService {
  constructor(
    //@InjectRepository(History) private historyRepository: Repository<History>,
    public eventsGateway:EventsGateway
  ) {}

  async getHello(gameId: number){
    this.reset(gameId);
    gameMap[gameId].interval = setInterval(this.moveCircle2.bind(this, gameId), 10);
  }

  moveCircle2(gameId){
    gameMap[gameId].ball_x += gameMap[gameId].ball_move_x;
    gameMap[gameId].ball_y += gameMap[gameId].ball_move_y;

    this.emit(gameId);
    if (gameMap[gameId].ball_y + 5 > 500) {
      gameMap[gameId].ball_move_y *= -1;
    }
    if (gameMap[gameId].ball_x - 10 >= 3000) {
      clearInterval(gameMap[gameId].interval);
      this.reset(gameId);
      this.emit(gameId);
      console.log("중지");
    }
  }

  reset(gameId: number){
    gameMap[gameId].ball_x = 500;
    gameMap[gameId].ball_y = 250;
    gameMap[gameId].ball_move_x = 2;
    gameMap[gameId].ball_move_y = 2;
    gameMap[gameId].player_one_y = 200;
    gameMap[gameId].player_two_y = 200;
  }

  emit(gameId: number){
    const gameInfo = {
      ball_x: gameMap[gameId].ball_x, 
      ball_y: gameMap[gameId].ball_y,
      player_one_y: gameMap[gameId].player_one_y,
      player_two_y: gameMap[gameId].player_two_y,
    }
    this.eventsGateway.server.to(`game-${gameId}`).emit("gameInfo", gameInfo);
  }

}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dmcontent } from 'src/entities/Dmcontent';
import { History } from 'src/entities/History';
import { EventsGateway } from 'src/events/events.gateway';
import { Repository } from 'typeorm';
import { gameMap } from './gameMap';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(History) private historyRepository: Repository<History>,
    @InjectRepository(Dmcontent) private dmcontentRepository:Repository<Dmcontent>,
    public eventsGateway:EventsGateway
  ) {}

  async gameHistory(gameId : number){
    return await this.historyRepository.findOne({id:gameId});
  }

  async gameStart(gameId: number){ 
    if (gameMap[gameId].game_state === 0 && gameMap[gameId].player_one_ready === 1 && gameMap[gameId].player_two_ready === 1){
      const history = new History();
      ////histoey초기화 시켜주기(다른데서 초기화가 이미 돼서 옴)
      this.reset(gameId);
      await this.historyRepository.update({id:gameId}, {state:1});
      gameMap[gameId].game_state = 1;
      gameMap[gameId].interval = setInterval(this.moveCircle.bind(this, gameId), gameMap[gameId].interval_time);
    }
    //console.log("mapmod", gameMap[gameId]);
  }

  async moveCircle(gameId){
    let rand;
    let newDir;
    let x_sign:number;
    let y_sign:number;

    gameMap[gameId].ball_x += gameMap[gameId].dir_x * gameMap[gameId].length;
    gameMap[gameId].ball_y += gameMap[gameId].dir_y * gameMap[gameId].length;
    this.emit(gameId, 0);
    if (gameMap[gameId].ball_y + 3 >= 500 || gameMap[gameId].ball_y - 3 <= 0) {
      newDir = this.changeDir(gameMap[gameId].dir_x, gameMap[gameId].dir_y, 1, 0);
      gameMap[gameId].dir_x = newDir.newDir_x;
      gameMap[gameId].dir_y = newDir.newDir_y;
      if (gameMap[gameId].random_map == 1){
        rand = Math.random();
        rand *= 10000;
        rand = Math.round(rand);
        rand %= 8;
        rand += 6;
        x_sign = gameMap[gameId].dir_x > 0 ? +1 : -1;
        gameMap[gameId].dir_x = x_sign * Math.abs(Math.cos(2 * Math.PI / rand));
        y_sign = gameMap[gameId].dir_y > 0 ? +1 : -1;
        gameMap[gameId].dir_y = y_sign * Math.abs(Math.sin(2 * Math.PI / rand));
      }
      //console.log("changeDir", gameMap[gameId].dir_x, gameMap[gameId].dir_y);
    }
    else if (this.isMiddleBlock(gameId) == true){
      if (350 >= gameMap[gameId].ball_x || gameMap[gameId].ball_x >= 650){
        newDir = this.changeDir(gameMap[gameId].dir_x, gameMap[gameId].dir_y, 0, 1);
        gameMap[gameId].dir_x = newDir.newDir_x;
        gameMap[gameId].dir_y = newDir.newDir_y;
      }
      else{
        newDir = this.changeDir(gameMap[gameId].dir_x, gameMap[gameId].dir_y, 1, 0);
        gameMap[gameId].dir_x = newDir.newDir_x;
        gameMap[gameId].dir_y = newDir.newDir_y;
      }
      if (gameMap[gameId].random_map == 1){
        rand = Math.random();
        rand *= 10000;
        rand = Math.round(rand);
        rand %= 8;
        rand += 6;
        console.log("rand:", rand);
        x_sign = gameMap[gameId].dir_x > 0 ? +1 : -1;
        gameMap[gameId].dir_x = x_sign * Math.abs(Math.cos(2 * Math.PI / rand));
        y_sign = gameMap[gameId].dir_y > 0 ? +1 : -1;
        gameMap[gameId].dir_y = y_sign * Math.abs(Math.sin(2 * Math.PI / rand));
      }
    }
    else if ((gameMap[gameId].ball_x >= 980)  || (gameMap[gameId].ball_x <= 20 )) {
      if (this.isPannel(gameId) === true){
        newDir = this.changeDir(gameMap[gameId].dir_x, gameMap[gameId].dir_y, 0, 1);
        gameMap[gameId].dir_x = newDir.newDir_x;
        gameMap[gameId].dir_y = newDir.newDir_y;
        rand = Math.random();
        rand *= 10000;
        rand = Math.round(rand);
        rand %= 8;
        rand += 6;
        x_sign = gameMap[gameId].dir_x > 0 ? +1 : -1;
        gameMap[gameId].dir_x = x_sign * Math.abs(Math.cos((2 * Math.PI) / rand));
        y_sign = gameMap[gameId].dir_y > 0 ? +1 : -1;
        gameMap[gameId].dir_y = y_sign * Math.abs(Math.sin((2 * Math.PI) / rand));
      }
      else{
        clearInterval(gameMap[gameId].interval);
        gameMap[gameId].game_state = 0;//?
        let history = await this.historyRepository.findOne({id:gameId});
        if (gameMap[gameId].ball_x < 100){
          gameMap[gameId].player_two_point++;
          await this.historyRepository.update({id:gameId}, {user2Point:(gameMap[gameId].player_two_point)})
        }
        else{
          gameMap[gameId].player_one_point++;
          await this.historyRepository.update({id:gameId}, {user1Point:(gameMap[gameId].player_one_point)})
        }
        /*
        this.server.to(`game-${result2.id}`).emit('ready', {
          player1: gameMap[result2.id].player_one_ready,
          player2: gameMap[result2.id].player_two_ready
        });
        */
        history = await this.historyRepository.findOne({id:gameId});
        const count = gameMap[gameId].player_one_point + gameMap[gameId].player_two_point;
        console.log("count:", count, "gameMap[gameId].game_set:", gameMap[gameId].game_set);
        console.log("db:", history.user1Point, history.user2Point);
        console.log("map:", gameMap[gameId].player_one_point, gameMap[gameId].player_two_point);
        this.reset(gameId);
        this.emit(gameId, 0);
        this.emit(gameId, 1);
        if (count >= gameMap[gameId].game_set){
          await this.dmcontentRepository.update({historyId:gameId}, {match:2});
          await this.historyRepository.update({id:gameId}, {state:2});
          console.log("game over\n\n\n");
          const player_one = history.user1Point;
          const player_two = history.user2Point;
          if (player_one > player_two){
            await this.historyRepository.update({id:gameId}, {winner:(history.userId1), loser:(history.userId2)})
          }
          else{
            await this.historyRepository.update({id:gameId}, {loser:(history.userId1), winner:(history.userId2)})
          }
          delete gameMap[gameId];
        }
        console.log("중지");
      }
    }
  }

  reset(gameId: number){
    gameMap[gameId].ball_x = 500;
    gameMap[gameId].ball_y = 250;
    let rand = Math.random();
    rand *= 10000;
    rand = Math.round(rand);
    rand %= 8;
    rand += 6;
    console.log("rand: ", rand, "2 Pi / rand : ", 2 * Math.PI / rand);
    gameMap[gameId].dir_x = Math.cos(2 * Math.PI / rand);
    gameMap[gameId].dir_y = Math.sin(2 * Math.PI / rand);
    gameMap[gameId].player_one_y = 200;
    gameMap[gameId].player_two_y = 200;
  }

  emit(gameId: number, num: number){
    if (num === 0 ){
      const gameInfo = {
        ball_x: gameMap[gameId].ball_x, 
        ball_y: gameMap[gameId].ball_y,
      }
      this.eventsGateway.server.to(`game-${gameId}`).emit("gameInfo", gameInfo);
    }
    else {
      const playerInfo = {
        player_one_y: gameMap[gameId].player_one_y, 
        player_two_y: gameMap[gameId].player_two_y,
      }      
      this.eventsGateway.server.to(`game-${gameId}`).emit('player_one', playerInfo);
      this.eventsGateway.server.to(`game-${gameId}`).emit('player_two', playerInfo);
    }
  }

  isMiddleBlock(gameId:number):boolean{
    if (gameMap[gameId].game_map === 1){
      if (gameMap[gameId].ball_x < 348 || gameMap[gameId].ball_x > 652)
        return false
      else if ((gameMap[gameId].ball_y >= 99 && gameMap[gameId].ball_y <= 151))
        return true;
      else if (gameMap[gameId].ball_y >= 349 && gameMap[gameId].ball_y <= 401)
        return true;
      else
        return false;
    }
    else
      return false
  }

  isPannel(gameId):boolean{
    if (gameMap[gameId].ball_x < 100 && gameMap[gameId].player_one_y <= gameMap[gameId].ball_y && gameMap[gameId].ball_y <= gameMap[gameId].player_one_y +100)
      return true;
    else if (gameMap[gameId].ball_x < 100)
      return false;
    if (gameMap[gameId].ball_x > 900 && gameMap[gameId].player_two_y <= gameMap[gameId].ball_y && gameMap[gameId].ball_y <= gameMap[gameId].player_two_y +100)
      return true;
    else if (gameMap[gameId].ball_x > 900)
      return false;
  }

  changeDir(dir_x:number, dir_y:number, vertical_x, vertical_y){//dir_x, dir_y 방향벡터의 크기는 1, vertical_x y 둘중 하나는 0 나머지 하나는 1; 
    //내적해서 cos(@)를 구함
    let cosA = Math.abs((vertical_x * dir_x) + (vertical_y * dir_y));//abs해서 작은 @를 구함.
    const theta = Math.abs(Math.acos(cosA));
    //const sinA = Math.sqrt(1 - Math.pow(cosA, 2));
    let sinA = Math.sin(theta);
    cosA = Math.cos(theta);
    //회전각도(= 파이-2@)를 구함
    const cosR = Math.cos(Math.PI - 2 * theta);
    const sinR = Math.sin(2 * theta);
    //벡터회전을 진행함
    let sign1 = dir_x * dir_y > 0 ? +1 : -1;//곱이 양수면 시계 회전, 음수이면 반시계회전
    let sign2 = vertical_x + -1 * vertical_y;//왼,오른쪽에 부딪힌다면 회전방향이 반대로 바꿔줘야함
    //시계회전이 "+부호 회전", 반시계회전이 "-부호 회전"
    const sign = sign1 * sign2;
    //const t = sign > 0 ? "양수" : "음수";
    const newDir_x = cosR * -1 *dir_x - (sign * sinR * -1 * dir_y);
    const newDir_y = (sign * sinR * -1 *dir_x) + (cosR * -1 * dir_y);
    return {newDir_x, newDir_y};//방향벡터의 크기가 1이 아닌경우가 존재할수 있는지..?
  }
}

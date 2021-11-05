import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { History } from 'src/entities/History';
import { EventsGateway } from 'src/events/events.gateway';
import { Repository } from 'typeorm';
import { gameMap } from './gameMap';

@Injectable()
export class GameService {
  constructor(
    //@InjectRepository(History) private historyRepository: Repository<History>,
    public eventsGateway:EventsGateway
  ) {}

  async gameStart(gameId: number){ 
    if (gameMap[gameId].game_state === 0 && gameMap[gameId].player_one_ready === 1 && gameMap[gameId].player_two_ready === 1){
      this.reset(gameId);
      gameMap[gameId].game_state = 1;
      gameMap[gameId].interval = setInterval(this.moveCircle.bind(this, gameId), 3);
    }     
    //console.log("mapmod", gameMap[gameId]);
  }

  moveCircle(gameId){
    gameMap[gameId].ball_x += gameMap[gameId].dir_x * gameMap[gameId].length;
    gameMap[gameId].ball_y += gameMap[gameId].dir_y * gameMap[gameId].length;
    //console.log("ball position", gameMap[gameId].ball_x, gameMap[gameId].ball_y);
    this.emit(gameId);
    if (gameMap[gameId].ball_y + 3 >= 500 || gameMap[gameId].ball_y - 3 <= 0) {
      const test = this.changeDir(gameMap[gameId].dir_x, gameMap[gameId].dir_y, 1, 0);
      gameMap[gameId].dir_x = test.newDir_x;
      gameMap[gameId].dir_y = test.newDir_y;
      if (gameMap[gameId].random_map == 1){
        let rand = Math.random();
        rand *= 10000;
        rand += 1;
        rand = Math.round(rand);
        rand %= 8;
        rand += 6;
        rand = rand > 10 ? 8:rand;
        rand = rand > 4 ? 8 : rand;
        const x_sign1 = gameMap[gameId].dir_x > 0 ? +1 : -1;
        gameMap[gameId].dir_x = x_sign1 * Math.abs(Math.cos(2 * Math.PI / rand));
        const y_sign1 = gameMap[gameId].dir_y > 0 ? +1 : -1;
        gameMap[gameId].dir_y = y_sign1 * Math.abs(Math.sin(2 * Math.PI / rand));
      }
      //console.log("changeDir", gameMap[gameId].dir_x, gameMap[gameId].dir_y);
    }
    else if (this.isMiddleBlock(gameId) == true){
      if (350 >= gameMap[gameId].ball_x || gameMap[gameId].ball_x >= 650){
        const t1 = this.changeDir(gameMap[gameId].dir_x, gameMap[gameId].dir_y, 0, 1);
        gameMap[gameId].dir_x = t1.newDir_x;
        gameMap[gameId].dir_y = t1.newDir_y;
      }
      else{
        const t2 = this.changeDir(gameMap[gameId].dir_x, gameMap[gameId].dir_y, 1, 0);
        gameMap[gameId].dir_x = t2.newDir_x;
        gameMap[gameId].dir_y = t2.newDir_y;
      }
      if (gameMap[gameId].random_map == 1){
        let rand = Math.random();
        rand *= 10000;
        rand = Math.round(rand);
        rand %= 8;
        rand += 6;
        rand = rand > 10 ? 8:rand;
        rand = rand > 4 ? 8 : rand;
        const x_sign2 = gameMap[gameId].dir_x > 0 ? +1 : -1;
        gameMap[gameId].dir_x = x_sign2 * Math.abs(Math.cos(2 * Math.PI / rand));
        const y_sign2 = gameMap[gameId].dir_y > 0 ? +1 : -1;
        gameMap[gameId].dir_y = y_sign2 * Math.abs(Math.sin(2 * Math.PI / rand));
      }
    }
    else if ((gameMap[gameId].ball_x >= 980)  || (gameMap[gameId].ball_x <= 20 )) {
      if (this.isPannel(gameId) === true){
        console.log("is pannel!");
        const t3 = this.changeDir(gameMap[gameId].dir_x, gameMap[gameId].dir_y, 0, 1);
        gameMap[gameId].dir_x = t3.newDir_x;
        gameMap[gameId].dir_y = t3.newDir_y;
        let rand = Math.random();
        rand *= 10000;
        rand = Math.round(rand);
        rand %= 8;
        rand += 6;
        rand = rand > 10 ? 8:rand;
        rand = rand > 4 ? 8 : rand;
        const x_sign3 = gameMap[gameId].dir_x > 0 ? +1 : -1;
        gameMap[gameId].dir_x = x_sign3 * Math.abs(Math.cos((2 * Math.PI) / rand));
        const y_sign3 = gameMap[gameId].dir_y > 0 ? +1 : -1;
        gameMap[gameId].dir_y = y_sign3 * Math.abs(Math.sin((2 * Math.PI) / rand));
      }
      else{
        clearInterval(gameMap[gameId].interval);
        gameMap[gameId].game_state = 0;
        this.reset(gameId);
        this.emit(gameId);
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

  emit(gameId: number){
    const gameInfo = {
      ball_x: gameMap[gameId].ball_x, 
      ball_y: gameMap[gameId].ball_y,
      player_one_y: gameMap[gameId].player_one_y,
      player_two_y: gameMap[gameId].player_two_y,
    }
    this.eventsGateway.server.to(`game-${gameId}`).emit("gameInfo", gameInfo);
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
    else if (gameMap[gameId].ball_x > 900 && gameMap[gameId].player_two_y <= gameMap[gameId].ball_y && gameMap[gameId].ball_y <= gameMap[gameId].player_two_y +100)
      return true;
    else
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

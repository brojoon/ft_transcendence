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
    this.reset(gameId);
    gameMap[gameId].interval = setInterval(this.moveCircle.bind(this, gameId), 10);
  }

  moveCircle(gameId){
    gameMap[gameId].ball_x += gameMap[gameId].dir_x * gameMap[gameId].length;
    gameMap[gameId].ball_y += gameMap[gameId].dir_y * gameMap[gameId].length;
    //console.log("ball position", gameMap[gameId].ball_x, gameMap[gameId].ball_y);
    this.emit(gameId);
    if (gameMap[gameId].ball_y + 5 >= 500 || gameMap[gameId].ball_y - 5 <= 0) {
      const test = this.changeDir(gameMap[gameId].dir_x, gameMap[gameId].dir_y, 1, 0);
      gameMap[gameId].dir_x = test.newDir_x;
      gameMap[gameId].dir_y = test.newDir_y;
      if (gameMap[gameId].random_map == 1){
        let rand = Math.random();
        rand *= 10000;
        rand += 1;
        rand = Math.round(rand);
        rand %= 7;
        const x_sign = gameMap[gameId].dir_x > 0 ? +1 : -1;
        gameMap[gameId].dir_x = x_sign * Math.abs(Math.cos(rand));
        const y_sign = gameMap[gameId].dir_y > 0 ? +1 : -1;
        gameMap[gameId].dir_y = y_sign * Math.abs(Math.sin(rand));
      }
      //console.log("changeDir", gameMap[gameId].dir_x, gameMap[gameId].dir_y);
    }
    else if (this.isMiddleBlock(gameId) == true){
      if (351 >= gameMap[gameId].ball_x || gameMap[gameId].ball_x >= 649){
        const test = this.changeDir(gameMap[gameId].dir_x, gameMap[gameId].dir_y, 0, 1);
        gameMap[gameId].dir_x = test.newDir_x;
        gameMap[gameId].dir_y = test.newDir_y;
      }
      else{
        const test = this.changeDir(gameMap[gameId].dir_x, gameMap[gameId].dir_y, 1, 0);
        gameMap[gameId].dir_x = test.newDir_x;
        gameMap[gameId].dir_y = test.newDir_y;
      }
      if (gameMap[gameId].random_map == 1){
        let rand = Math.random();
        rand *= 10000;
        rand += 1;
        rand = Math.round(rand);
        rand %= 7;
        const x_sign = gameMap[gameId].dir_x > 0 ? +1 : -1;
        gameMap[gameId].dir_x = x_sign * Math.abs(Math.cos(rand));
        const y_sign = gameMap[gameId].dir_y > 0 ? +1 : -1;
        gameMap[gameId].dir_y = y_sign * Math.abs(Math.sin(rand));
      }
    }
    else if (gameMap[gameId].ball_x >= 980 || gameMap[gameId].ball_x <= 20) {
      if (this.isPannel(gameId) === true){
        //console.log("changeDir2", gameMap[gameId].dir_x, gameMap[gameId].dir_y);
        const test = this.changeDir(gameMap[gameId].dir_x, gameMap[gameId].dir_y, 0, 1);
        gameMap[gameId].dir_x = test.newDir_x;
        gameMap[gameId].dir_y = test.newDir_y;
        let rand = Math.random();
        rand *= 10000;
        rand += 1;
        rand = Math.round(rand);
        rand %= 7;
        const x_sign = gameMap[gameId].dir_x > 0 ? +1 : -1;
        gameMap[gameId].dir_x = x_sign * Math.abs(Math.cos(rand));
        const y_sign = gameMap[gameId].dir_y > 0 ? +1 : -1;
        gameMap[gameId].dir_y = y_sign * Math.abs(Math.sin(rand));
      }
      else{
        clearInterval(gameMap[gameId].interval);
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
    rand += 1;
    rand = Math.round(rand);
    rand %= 7;
    gameMap[gameId].dir_x = Math.cos(rand);
    gameMap[gameId].dir_y = Math.sin(rand);
    gameMap[gameId].length = 4;
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
    if (gameMap[gameId].game_map === true){
      if (gameMap[gameId].ball_x < 349 || gameMap[gameId].ball_x > 651)
        return false
      else if (gameMap[gameId].ball_y > 100 && gameMap[gameId].ball_y < 150)
        return true;
      else if (gameMap[gameId].ball_y > 350 && gameMap[gameId].bally < 400)
        return true;
      else
        return false;
    }
    else{
      return false
    }
  }

  isPannel(gameId):boolean{
    if (gameMap[gameId].ball_x < 100 && gameMap[gameId].player_one_y <= gameMap[gameId].ball_y && gameMap[gameId].ball_y <= gameMap[gameId].player_one_y +100)
      return true;
    if (gameMap[gameId].ball_x > 900 && gameMap[gameId].player_two_y <= gameMap[gameId].ball_y && gameMap[gameId].ball_y <= gameMap[gameId].player_two_y +100)
      return true;
    return false;
  }

  changeDir(dir_x:number, dir_y:number, vertical_x, vertical_y){//dir_x, dir_y 방향벡터의 크기는 1, vertical_x y 둘중 하나는 0 나머지 하나는 1; 
    //내적해서 cos(@)를 구함
    let cosA = Math.abs((vertical_x * dir_x) + (vertical_y * dir_y));//abs해서 작은 @를 구함.
    const theta = Math.acos(cosA);
    //const sinA = Math.sqrt(1 - Math.pow(cosA, 2));
    let sinA = Math.sin(theta);
    //console.log("before cosA", cosA);
    cosA = Math.cos(theta);
    //console.log("after cosA", cosA);
    //회전각도(= 파이-2@)를 구함
    //const cosR = -1 * (Math.pow(cosA, 2) - Math.pow(sinA, 2));
    //const sinR = 2 * cosA * sinA;
    let cosR = -1 * Math.cos(2 *theta)
    //console.log("before cosR", cosR);
    cosR = Math.cos(Math.PI - 2 * theta);
    //console.log("after cosR", cosR);
    const sinR = Math.sin(2 * theta);
    //벡터회전을 진행함
    let sign1 = dir_x * dir_y > 0 ? +1 : -1;//곱이 양수면 시계 회전, 음수이면 반시계회전
    let sign2 = vertical_x + -1 * vertical_y;//왼,오른쪽에 부딪힌다면 회전방향이 반대로 바꿔줘야함
    //시계회전이 "+부호 회전", 반시계회전이 "-부호 회전"
    const sign = sign1 * sign2;
    const t = sign > 0 ? "양수" : "음수";
    //console.log(t, "방향으로 회전합니다");
    const newDir_x = cosR * -1 *dir_x - (sign * sinR * -1 * dir_y);
    const newDir_y = (sign * sinR * -1 *dir_x) + (cosR * -1 * dir_y);
    return {newDir_x, newDir_y};//방향벡터의 크기가 1이 아닌경우가 존재할수 있는지..?
  }
}

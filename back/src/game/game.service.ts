import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dmcontent } from 'src/entities/Dmcontent';
import { History } from 'src/entities/History';
import { Users } from 'src/entities/Users';
import { EventsGateway } from 'src/events/events.gateway';
import { Repository } from 'typeorm';
import { gameMap } from './gameMap';

const dirMap = [ 
  {dir_x: 0.5, dir_y: 0.866}, 
  {dir_x: 0.71, dir_y: 0.71},
  {dir_x: 0.866, dir_y: 0.5},
];

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(History) private historyRepository: Repository<History>,
    @InjectRepository(Dmcontent) private dmcontentRepository:Repository<Dmcontent>,
    @InjectRepository(Users) private usersRepository:Repository<Users>,
    public eventsGateway:EventsGateway
  ) {}

  async gameHistory(gameId : number){
    return await this.historyRepository.findOne({id:gameId});
  }

  async gameStart(gameId: number){ 
    if (gameMap[gameId].game_state === 0 && gameMap[gameId].player_one_ready === 1 && gameMap[gameId].player_two_ready === 1){
      ////histoey초기화 시켜주기(다른데서 초기화가 이미 돼서 옴)
      this.reset(gameId);
      await this.historyRepository.update({id:gameId}, {state:1});
      gameMap[gameId].game_state = 1;
      gameMap[gameId].game_start = 1;
      this.eventsGateway.server.to(`game-${gameId}`).emit('gameStart', {
        gameStart: gameMap[gameId].game_start
      });
      gameMap[gameId].interval = setInterval(this.moveCircle.bind(this, gameId), gameMap[gameId].interval_time);
    }
  }

  async moveCircle(gameId){
    let rand;
    let newDir;
    let x_sign:number;
    let y_sign:number;

    gameMap[gameId].ball_x += gameMap[gameId].dir_x * gameMap[gameId].length;
    gameMap[gameId].ball_y += gameMap[gameId].dir_y * gameMap[gameId].length;
    this.emit(gameId, 0);
    const x = gameMap[gameId].ball_x + gameMap[gameId].dir_x * gameMap[gameId].length;
    const y = gameMap[gameId].ball_y + gameMap[gameId].dir_y * gameMap[gameId].length;
    if (y >= 495 || y <= 5) {
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
    } else if (gameMap[gameId].game_map === 1 && this.isMiddleBlock(gameId, x ,y)){  
    } else if (this.isPannel(gameId , x ,y)){
      newDir = this.changeDir(gameMap[gameId].dir_x, gameMap[gameId].dir_y, 0, 1);
      gameMap[gameId].dir_x = newDir.newDir_x;
      gameMap[gameId].dir_y = newDir.newDir_y;
      x_sign = gameMap[gameId].dir_x > 0 ? +1 : -1;
      y_sign = Math.floor(Math.random() * 2) === 0 ? -1 : 1;
      const x = Math.floor(Math.random() * 3);
      gameMap[gameId].dir_x = x_sign * dirMap[x].dir_x;
      gameMap[gameId].dir_y = y_sign * dirMap[x].dir_y;
    } else if (gameMap[gameId].ball_x <= 0 || gameMap[gameId].ball_x >= 1000) {
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
      this.eventsGateway.server.to(`game-${gameId}`).emit('point', {
        player1: gameMap[gameId].player_one_point,
        player2: gameMap[gameId].player_two_point, 
      });
      history = await this.historyRepository.findOne({id:gameId});
      // const count = gameMap[gameId].player_one_point + gameMap[gameId].player_two_point;
      // console.log("count:", count, "gameMap[gameId].game_set:", gameMap[gameId].game_set);
      // console.log("db:", history.user1Point, history.user2Point);
      // console.log("map:", gameMap[gameId].player_one_point, gameMap[gameId].player_two_point);
      this.reset(gameId);
      this.emit(gameId, 0);
      this.emit(gameId, 1);
      const deadline = ((gameMap[gameId].game_set - 3) / 2) + 2;
      if (deadline <= gameMap[gameId].player_one_point || deadline <= gameMap[gameId].player_two_point){
        await this.dmcontentRepository.update({historyId:gameId}, {match:2});
        await this.historyRepository.update({id:gameId}, {state:2});
        console.log("game over");
        const player_one = history.user1Point;
        const player_two = history.user2Point;
        if (player_one > player_two){
          await this.historyRepository.update({id:gameId}, {winner:(history.userId1), loser:(history.userId2)})
        }
        else{
          await this.historyRepository.update({id:gameId}, {loser:(history.userId1), winner:(history.userId2)})
        }
        this.eventsGateway.server.to(`game-${gameId}`).emit("end", null);
        delete gameMap[gameId];
      }
      console.log("중지");
    }
  }
  reset(gameId: number){
    const x = Math.floor(Math.random() * 3);
    const signX = Math.floor(Math.random() * 2) === 0 ? -1 : 1;
    const signY = Math.floor(Math.random() * 2) === 0 ? -1 : 1;
    gameMap[gameId].ball_x = 500;
    gameMap[gameId].ball_y = 250;
    gameMap[gameId].dir_x = signX * dirMap[x].dir_x;
    gameMap[gameId].dir_y = signY * dirMap[x].dir_y;
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

  isMiddleBlock(gameId:number, x:number, y:number):boolean{
    if (x >= 345 && x <= 655 && y >= 95 && y <= 155){ 
      if (this.checkSide(gameId , 1))
        gameMap[gameId].dir_y *= -1;
      else
        gameMap[gameId].dir_x *= -1;
      return true
    }   
    else if (x >= 345 && x <= 655 && y >= 345 && y <= 405) {
      if (this.checkSide(gameId, 2))
        gameMap[gameId].dir_y *= -1;
      else
        gameMap[gameId].dir_x *= -1;
      return true
    }
    else
      return false;
  }

  checkSide(gameId:number, box:number):boolean{
    const x = gameMap[gameId].ball_x + gameMap[gameId].dir_x * gameMap[gameId].length;
    const y = gameMap[gameId].ball_y + gameMap[gameId].dir_y * gameMap[gameId].length;
    const d_x = x - 345 <= 655 - x ? x - 345 : 655 - x;
    const d_y1 = y - 95 <= 155 - y ? y - 95 : 155 - y;
    const d_y2 = y - 345 <= 405 - y ? y - 345 : 405 - y;
    if ( box === 1 && d_x <= d_y1)
      return false;
    else if (box === 2 && d_x <= d_y2)
      return false;
    return true;
  }

  isPannel(gameId:number, x:number, y:number):boolean{
    const x_now = gameMap[gameId].ball_x;
    const y_now = gameMap[gameId].ball_y;
    const p_one = gameMap[gameId].player_one_y;
    const p_two = gameMap[gameId].player_two_y;
    if ((x_now < 20 && p_one <= y_now && y_now <= p_one + 100) 
      || (x_now > 980 && p_two <= y_now && y_now <= p_two + 100))
      return false;
    if (x < 20 && p_one <= y && y <= p_one + 100)
      return true;
    else if (x < 20)
      return false;
    if (x > 980 && p_two <= y && y <= p_two + 100)
      return true;
    else if (x > 980)
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

  async numOfWin(userId:string){
    const numberOfWin =  await this.historyRepository.count({winner:userId});
    const user = await this.usersRepository.findOne({userId});
    const star = user.maxStarOfVictory;
    if (Math.floor(numberOfWin / 5) > star && (numberOfWin / 5 <= 5)){
      const now = Date();
      await this.usersRepository.update({userId}, {maxStarOfVictory:Math.floor(numberOfWin / 5), maxStarOfVictoryTime:now});
      return {number:numberOfWin, star:Math.floor(numberOfWin / 5), time:now};
    }
    return {number:numberOfWin, star, time:user.maxStarOfVictoryTime}
  }

  async numOfLose(userId:string){
    const numberOfLose =  await this.historyRepository.count({loser:userId});
    const user = await this.usersRepository.findOne({userId});
    const star = user.maxStarOfLose;
    if (Math.floor(numberOfLose / 5) > star && (numberOfLose / 5 <= 5)){
      const now = Date();
      await this.usersRepository.update({userId}, {maxStarOfLose:Math.floor(numberOfLose / 5), maxStarOfLoseTime:now});
      return {number:numberOfLose, star:Math.floor(numberOfLose / 5), time:now};
    }
    return {number:numberOfLose, star, time:user.maxStarOfLoseTime}
  }

  async numOfFight(userId:string){
    const numberOfWin =  await this.historyRepository.count({winner:userId});
    const numberOfLose =  await this.historyRepository.count({loser:userId});
    const numberOfFight =  numberOfWin + numberOfLose;
    const user = await this.usersRepository.findOne({userId});
    const star = user.maxStarOfFight;
    if (Math.floor(numberOfFight / 5) > star && (numberOfFight / 5 <= 5)){
      const now = Date();
      await this.usersRepository.update({userId}, {maxStarOfFight:Math.floor(numberOfFight / 5), maxStarOfFightTime:now});
      return {number:numberOfFight, star:Math.floor(numberOfFight / 5), time:now};
    }
    return {number:numberOfFight, star, time:user.maxStarOfFightTime}
  }

  async winLoseFight(userId:string, targetUserId:string){
    if (!await this.usersRepository.findOne({userId}))
      throw new UnauthorizedException("조회할 권한 없음");
    const numOfWin = await this.historyRepository.count({winner:targetUserId});
    const numOfLose = await this.historyRepository.count({loser:targetUserId});
    const ret = new Object();
    ret["numOfWin"] = numOfWin;
    ret["numOfLose"] = numOfLose;
    ret["numOfFight"] = numOfWin + numOfLose;
    return ret;
  }

  private async getUsernameByUserid(userId:string):Promise<string>{
    const obj = await this.usersRepository.findOne({userId});
    return obj.username;
  }

  async userGameHistory(userId:string, targetId:string){
    if (!await this.usersRepository.findOne({userId}))
      throw new UnauthorizedException("조회 권한이 없음");
    const arr = await this.historyRepository.find({where:[
      {winner:targetId}, 
      {loser:targetId}
    ], select:[
      "id", "userId1", "userId2", "user1Point", "user2Point", "winner", "loser", "updatedAt",
    ]});
    arr.sort(function(a,b){
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return (+new Date(b.updatedAt)) - (+new Date(a.updatedAt));
    });
    const ret = new Array();
    for (var i = 0; i < arr.length; i++){
      ret[i] = new Object();
      ret[i].historyId = arr[i].id;
      ret[i].date = arr[i].updatedAt;
      //ret[i].targetId = targetId;
      if (arr[i].winner == targetId){
        ret[i].isWinner = true;
        ret[i].opponent = await this.getUsernameByUserid(arr[i].loser);
        ret[i].myPoint = arr[i].user1Point > arr[i].user2Point ? arr[i].user1Point : arr[i].user2Point;
        ret[i].opponentPoint = arr[i].user1Point < arr[i].user2Point ? arr[i].user1Point : arr[i].user2Point;
      }
      else{
        ret[i].isWinner = false;
        ret[i].opponent = await this.getUsernameByUserid(arr[i].winner);
        ret[i].myPoint = arr[i].user1Point < arr[i].user2Point ? arr[i].user1Point : arr[i].user2Point;
        ret[i].opponentPoint = arr[i].user1Point > arr[i].user2Point ? arr[i].user1Point : arr[i].user2Point;
      }
    }
    return ret;
  }
}

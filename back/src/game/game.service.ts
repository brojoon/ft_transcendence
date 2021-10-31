import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { History } from 'src/entities/History';
import { EventsGateway } from 'src/events/events.gateway';
import { Repository } from 'typeorm';

const data ={
  x: 500,
  y: 250,
  d_x: 2,
  d_y: 2,
}
var interval;

@Injectable()
export class GameService {
  constructor(
    //@InjectRepository(History) private historyRepository: Repository<History>,
    public eventsGateway:EventsGateway
  ) {}

  getHello(){
    //this.eventsGateway.server.emit("welcome", data); 
    interval = setInterval(this.moveCircle.bind(this), 10);
    //console.log(interval);
  }

  moveCircle() {
    data.x += data.d_x;
    data.y += data.d_y;
    console.log("가는중");
    this.eventsGateway.server.emit("welcome", data);  
    if (data.y > 485){
      data.d_y *= -1;
    }
    if (data.x >= 1010)
    {
      clearInterval(interval);
      data.x = 500;
      data.y = 250;
      data.d_x = 2;
      data.d_y = 2;
      console.log("중지");
    }
  }
}

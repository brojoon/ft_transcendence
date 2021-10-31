import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { History } from 'src/entities/History';
import { EventsGateway } from 'src/events/events.gateway';
import { Repository } from 'typeorm';

const data ={
  x: 500,
  y: 250
}
var interval;

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(History) private connectRepository: Repository<History>,
    public eventsGateway:EventsGateway
  ) {}

  getHello(){
    //this.eventsGateway.server.emit("welcome", data); 
    interval = setInterval(this.moveCircle.bind(this), 10);
    //console.log(interval);
  }

  moveCircle() {
    data.x += 2;
    data.y += 2;
    console.log("가는중");
    this.eventsGateway.server.emit("welcome", data);  
    if (data.x > 1000){
      clearInterval(interval);
      console.log("중지");
      data.x = 500;
      data.y = 250;
    }
  }
}

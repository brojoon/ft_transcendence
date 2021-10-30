import { Controller, Get, Res } from '@nestjs/common';
import path from 'path';
import { AppService } from './app.service';
import { EventsGateway } from './events/events.gateway';

@Controller()
export class AppController {

  constructor(
    private readonly appService: AppService,
    private eventsGateway:EventsGateway
  ) {}

  @Get()
  getHello() {
    const data ={
      name:`youngrch`,
      msg: `hi`
    }
    this.eventsGateway.server.emit("welcome", data);
  }
}


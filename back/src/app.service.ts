import { Injectable } from '@nestjs/common';
import { EventsGateway } from './events/events.gateway';

@Injectable()
export class AppService {
  constructor(
    public eventsGateway:EventsGateway
  ) {}

  getHello() : string{
    return "welcome 42!"
  }
}

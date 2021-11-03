import { Controller, Get} from '@nestjs/common';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
  constructor(
    private readonly gameService: GameService
  ) {}

  @Get()
  getHello() {
    return this.gameService.getHello(1);
  }

}

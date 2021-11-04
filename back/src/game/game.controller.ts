import { Controller, Get} from '@nestjs/common';
import { GameService } from './game.service';

@Controller('api/game')
export class GameController {
  constructor(
    private readonly gameService: GameService
  ) {}

  @Get()
  gameStart() {
    return this.gameService.gameStart(1);
  }

}

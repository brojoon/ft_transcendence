import { Controller, Get, Param} from '@nestjs/common';
import { GameService } from './game.service';

@Controller('api/game')
export class GameController {
  constructor(
    private readonly gameService: GameService
  ) {}

  @Get('start/:id')
  gameStart(@Param('id') id: number) {
    return this.gameService.gameStart(id);
  }

}

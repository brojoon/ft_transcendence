import { Controller, Get, Param} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GameService } from './game.service';

@ApiBearerAuth('ts_token')
@ApiTags('game') // API문서 카테고리
@Controller('api/game')
export class GameController {
  constructor(
    private readonly gameService: GameService
  ) {}

  @Get("/gameStart/:gameId")
  gameStart(@Param("gameId") gameId) {
    return this.gameService.gameStart(gameId);
  }

  @Get("/start/:gameId")
  game_Start(@Param("gameId") gameId) {
    return this.gameService.gameStart(gameId);
  }

  @Get("")
  testStart(@Param("gameId") gameId) {
    return this.gameService.gameStart(gameId);
  }

  @Get("/history/:gameId")
  async gameHistory(@Param("gameId") gameId:number){
    return await this.gameService.gameHistory(gameId);
  }
}

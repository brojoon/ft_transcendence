import { Controller, Get, Param, UseGuards} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'common/decorators/user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GameService } from './game.service';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth('ts_token')
@ApiTags('game') // API문서 카테고리
@Controller('api/game')
export class GameController {
  constructor(
    private readonly gameService: GameService
  ) {}

  @Get("/start/:gameId")
  game_Start(@Param("gameId") gameId) {
    return this.gameService.gameStart(gameId);
  }

  @Get("/history/:gameId")
  async gameHistory(@Param("gameId") gameId:number){
    return await this.gameService.gameHistory(gameId);
  }

  @Get("/achevement/numOfWin")
  async numOfWin(@User() user){
    return await this.gameService.numOfWin(user.userId);
  }

  @Get("/achevement/numOfLose")
  async numOfLose(@User() user){
    return await this.gameService.numOfLose(user.userId);
  }

  @Get("/achevement/numOfFight")
  async numOfFight(@User() user){
    return ((await this.gameService.numOfWin(user.userId)) + (await this.gameService.numOfLose(user.userId)));
  }
}

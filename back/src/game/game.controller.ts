import { Controller, Get, Param, UseGuards, UseInterceptors} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'common/decorators/user.decorator';
import { UndefinedToNullInterceptor } from 'common/interceptors/undefinedToNull.interceptor';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GameService } from './game.service';

@UseGuards(JwtAuthGuard)
//@ApiBearerAuth('ts_token')
@ApiTags('game') // API문서 카테고리
@UseInterceptors(UndefinedToNullInterceptor) // 마지막 리턴값 undifined일경우 null로 바꿈
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

  @Get("/achievement/numOfWin")
  async numOfWin(@User() user){
    return await this.gameService.numOfWin(user.userId);
  }

  @Get("/achievement/numOfLose")
  async numOfLose(@User() user){
    return await this.gameService.numOfLose(user.userId);
  }

  @Get("/achievement/numOfFight")
  async numOfFight(@User() user){
    return await this.gameService.numOfFight(user.userId);
  }

  @Get("/history/winLoseFight/:userId")
  async winLoseFight(@User() user, @Param("userId") userId:string){
    return await this.gameService.winLoseFight(user.userId, userId);
  }

  @Get("/history/user/myGameHistory")
  async myGameHistory(@User() user){
    return await this.gameService.myGameHistory(user.userId);
  }
}

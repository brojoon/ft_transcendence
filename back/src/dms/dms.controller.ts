import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, HttpCode } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'common/decorators/user.decorator';
import { UserDto } from 'common/dto/user.dto';
import { UndefinedToNullInterceptor } from 'common/interceptors/undefinedToNull.interceptor';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { DmsService } from './dms.service';
import { MessagetDto } from './dto/message.dto';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth('ts_token')
@ApiTags('DM') // API문서 카테고리
@UseInterceptors(UndefinedToNullInterceptor) // 마지막 리턴값 undifined일경우 null로 바꿈
@Controller('api/dms')
export class DmsController {
  constructor(private readonly dmsService: DmsService) {}

  @ApiOperation({ summary: 'DM 신청 및 DMid 조회'})
  @ApiResponse ({
    status: 200,
    description: '"return: dmId"',
    type: Number
  })
  @HttpCode(200)
  @Get('create/:send/:get')
  async createAndGetDm(@Param('send') userId1: string, @Param('get') userId2: string) {
    return this.dmsService.createAndGetDm(userId1, userId2);
  }

  @ApiOperation({ summary: '내 DM 목록'})
  @ApiResponse ({
    status: 200,
    description: '"return: DM 목록"',
  })
  @HttpCode(200)
  @Get('dmlist')
  async getDmList(@User() user: UserDto) {
    return this.dmsService.getDmList(user.userId);
  }

  @ApiOperation({ summary: '메세지 보내기 / 게임신청'})
  @ApiResponse ({
    status: 201,
    description: 'match초기값 = 0 / histortId초기값 = 0 메세지는 바디에 넣어서 보내기',
  })
  @HttpCode(201)
  @Post('getMessage/:send/:get/:match/:historyId')
  async sendMessage(
    @Param('send') userId1: string, 
    @Param('get') userId2: string,
    @Param('match') match: number,
    @Param('historyId') historyId: number,
    @Body() body: MessagetDto,
    ) {
    return this.dmsService.sendMessage(userId1, userId2, body.message, match, historyId);
  }

  @ApiOperation({ summary: '전체 메세지 받기'})
  @ApiResponse ({
    status: 200,
    description: '최근 메세지가 가장 위로 정렬',
  })
  @HttpCode(200)
  @Get('getMessage/:send/:get')
  async getAllMessage(@Param('send') userId1: string, @Param('get') userId2: string) {
    return this.dmsService.getAllMessage(userId1, userId2);
  }
}

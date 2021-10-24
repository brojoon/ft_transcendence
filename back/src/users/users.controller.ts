import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, UseInterceptors, UseGuards, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'common/decorators/user.decorator';
import { UserDto } from 'common/dto/user.dto';
import { UndefinedToNullInterceptor } from 'common/interceptors/undefinedToNull.interceptor';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('USERS') // API문서 카테고리
@UseInterceptors(UndefinedToNullInterceptor) // 마지막 리턴값 undifined일경우 null로 바꿈
@Controller('api/users') // uri시작부분
export class UsersController {
  constructor(
      private readonly usersService: UsersService
    ) {}

  @ApiOperation({ summary: '내정보 조회'})
  @ApiResponse ({
    status: 200,
    description: '성공',
    type: UserDto,
  })
  @ApiResponse ({
      status: 500,
      description: '서버에러',
  })
  @Get()
  getUser(@User() user) {
    return user || false;
  }

  @ApiOperation({ summary: 'two-factor on'})
  @ApiResponse ({
    status: 200,
    description: '"이차 인증 켜짐": [return value : true]',
  })
  @HttpCode(200)
  @Get('turn-on')
  async TwoFactorSwitchOn(@User() user) {
    return this.usersService.TwoFactorSwitch(user.userId, true);
  }

  @ApiOperation({ summary: 'two-factor off'})
  @ApiResponse ({
    status: 200,
    description: '"이차 인증 꺼짐": [return value : true]',
  })
  @HttpCode(200)
  @Get('turn-off')
  async TwoFactorSwitchOff(@User() user) {
    return this.usersService.TwoFactorSwitch(user.userId, false);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, UseInterceptors, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'common/decorators/user.decorator';
import { UserDto } from 'common/dto/user.dto';
import { UndefinedToNullInterceptor } from 'common/interceptors/undefinedToNull.interceptor';
import { JoinRequestDto } from './dto/join.request.dto';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { Users } from 'src/entities/Users';

@ApiTags('USERS') // API문서 카테고리
@UseInterceptors(UndefinedToNullInterceptor) // 마지막 리턴값 undifined일경우 null로 바꿈
@Controller('api/users') // uri시작부분
export class UsersController {
  constructor(
      private readonly usersService: UsersService,
      private readonly authService: AuthService
    ) {}
///////////////////////////////////////////////////////////////////
  @UseGuards(JwtAuthGuard)
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
///////////////////////////////////////////////////////////////////
  @ApiOperation({ summary: '회원가입'})
  @ApiResponse ({
    status: 201,
    description: '성공',
    type: UserDto,
  })
  @Post()
  async Join(@Body() body: JoinRequestDto) {
      await this.usersService.Join( body.oauthId, body.username, body.userId, body.email);
  }
///////////////////////////////////////////////////////////////////
  @ApiOperation({ summary: '로그인' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@User() user) {
    return this.authService.login(user);
  }
///////////////////////////////////////////////////////////////////
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '로그아웃'})
  @ApiResponse ({
    status: 201,
    description: '성공',
  })
  @Post('logout')
  logout(@Req() req, @Res() res) {
    req.logout();
    res.clearCookie('connect.sid', { httpOnly: true});
    res.send('ok');
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile() {
    return "user";
  }
///////////////////////////////////////////////////////////////////
}

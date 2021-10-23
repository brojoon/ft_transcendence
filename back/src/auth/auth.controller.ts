import { Controller, Get, HttpCode, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Redirect } from 'common/decorators/redirect.decorator';
import { User } from 'common/decorators/user.decorator';
import { UndefinedToNullInterceptor } from 'common/interceptors/undefinedToNull.interceptor';
import { AuthService } from './auth.service';
import { Intra42AuthGuard } from './guards/intra42-auth.guard';


@ApiTags('OAUTH2') // API문서 카테고리
@UseInterceptors(UndefinedToNullInterceptor) // 마지막 리턴값 undifined일경우 null로 바꿈
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}
  
  @UseGuards(Intra42AuthGuard)
  @ApiOperation({ summary: '42 oauth 로그인'})
  @ApiResponse ({
    status: 302,
    description: '로그인창 redirect',
  })
  @HttpCode(302)
  @Get('42')
  async 42() {
  }

  @UseGuards(Intra42AuthGuard)
  @HttpCode(200)
  @Get('42/callback')
  async login(@Req() req, @Res() res) {
    const token = await this.authService.login(req.user);
    res.cookie('42token', token.access_token, { httpOnly: false });
    res.send('login');
    //res.stat.redirect('http://localhost:3090/')
  }

  @ApiOperation({ summary: '42oauth 로그아웃' })
  @HttpCode(200)
  @Get('logout')
  logout(@Req() req, @Res() res) {
    res.clearCookie('42token');
    res.send('logout');
    //res.redirect('http://localhost:3090/')
  }

}

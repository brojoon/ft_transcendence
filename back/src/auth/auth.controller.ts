import { Controller, Get, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UndefinedToNullInterceptor } from 'common/interceptors/undefinedToNull.interceptor';
import { Intra42AuthGuard } from './guards/intra42-auth.guard';

@ApiTags('OAUTH2') // API문서 카테고리
@UseInterceptors(UndefinedToNullInterceptor) // 마지막 리턴값 undifined일경우 null로 바꿈
@Controller('auth')
export class AuthController {

  @UseGuards(Intra42AuthGuard)
  @Get('42/callback')
  async login(@Req() req, @Res() res) {
    res.redirect('http://localhost:3095/api');
  }

  @UseGuards(Intra42AuthGuard)
  @Get('42')
  async 42() {
  }
}

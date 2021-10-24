import { Body, Controller, Get, HttpCode, Post, Req, Res, UnauthorizedException, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Header } from 'common/decorators/header.decorator';
import { User } from 'common/decorators/user.decorator';
import { TwoFactorDto } from 'common/dto/two-factor.dto';
import { UndefinedToNullInterceptor } from 'common/interceptors/undefinedToNull.interceptor';
import { Users } from 'src/entities/Users';
import { Repository } from 'typeorm';
import { AuthService } from './auth.service';
import { Intra42AuthGuard } from './guards/intra42-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import JwtTwoFactorGuard from './guards/two-factor.guard';

@ApiTags('OAUTH2') // API문서 카테고리
@UseInterceptors(UndefinedToNullInterceptor) // 마지막 리턴값 undifined일경우 null로 바꿈
@Controller('auth')
export class AuthController {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(Intra42AuthGuard)
  @ApiOperation({ summary: '42oauth 로그인'})
  @ApiResponse ({
    status: 302,
    description: '로그인 api  로그인창으로 리다이렉션',
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
    /*
    cookie: 42token sdasdasdasd
    cookie: 42token1 asdadafdsf
    */
    const result = await this.usersRepository.findOne({
      where: { userId: req.user.userId},
      select: ['twofactorEnable'],
    });
    
    if (result.twofactorEnable){
      res.send('need two-factor');
    }else{
      res.send('login');
    }
    //res.status(302).redirect('http://localhost:3090/')
  }

  @UseGuards(JwtAuthGuard)
  @Post('qrlogin')
  @ApiOperation({ summary: 'QR코드 로그인' })
  @HttpCode(200)
  async authenticate(@User() user, @Res() res, @Body() {TwoFactorAuthcode}: TwoFactorDto) {
    const isCodeValid =  await this.authService.isTwoFactorAuthenticationCodeValid(TwoFactorAuthcode, user.userId); 
    if (isCodeValid === false) {
      throw new UnauthorizedException('Wrong authentication code');
    }
    const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(user.userId, true);
    res.cookie('two-factor-Cookie', accessTokenCookie);
    res.send('QR코드 인증완료');
  }

  @ApiOperation({ summary: '42oauth 로그아웃' })
  @HttpCode(200)
  @Get('logout')
  logout(@Req() req, @Res() res) {
    res.clearCookie('42token');
    res.send('logout');
    //res.status(302).redirect('http://localhost:3090/')
  }

  @UseGuards(JwtAuthGuard)
  @Get('make-qrcode')
  async pipeQrCodeStream(@User() user, @Res() response: Response) {
    const { otpauthUrl } = await this.authService.generateTwoFactorAuthenticationSecret(user.userId, user.email);
    return this.authService.pipeQrCodeStream(response, otpauthUrl);
  }

}


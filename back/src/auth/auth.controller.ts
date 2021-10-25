import { Body, Controller, Get, HttpCode, Post, Req, Res, UnauthorizedException, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'common/decorators/user.decorator';
import { TwoFactorDto } from 'common/dto/two-factor.dto';
import { UndefinedToNullInterceptor } from 'common/interceptors/undefinedToNull.interceptor';
import { Users } from 'src/entities/Users';
import { Repository } from 'typeorm';
import { AuthService } from './auth.service';
import { Intra42AuthGuard } from './guards/intra42-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('AUTH') // API문서 카테고리
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
    description: '"1차 인증 성공시": [return value: null] /// "2차 진입시": [return value: user(유저 정보)]',
  })
  @HttpCode(302)
  @Get('42')
  async 42() {
  }

  @UseGuards(Intra42AuthGuard)
  @HttpCode(200)
  @Get('42/callback')
  async login(@Req() req, @Res() res) {
    const result: boolean = await this.authService.checktwofactorEnable(req.user.userId);
    if (result){
      res.send(req.user);
    }else{
      const token = await this.authService.login(req.user);
      res.cookie('ts_token', token.access_token, { httpOnly: false });
      res.send(null);
    }
  }

  @Post('qrlogin')
  @ApiOperation({ summary: 'QR코드 로그인' })
  @ApiResponse ({
    status: 201,
    description: '"Qr 로그인 성공시": return value: null',
  })
  @ApiResponse ({
    status: 401,
    description: '잘못된 OTP code일 경우 / two-factor기능 off 이용자일 경우',
  })
  @HttpCode(201)
  async authenticate(@Body() body: TwoFactorDto,  @Res() res) {
    const result: boolean = await this.authService.checktwofactorEnable(body.userId);
    if (!result){
      throw new UnauthorizedException('checktwofactorEnable valus is fales');
    }
    const isCodeValid =  await this.authService.isTwoFactorAuthenticationCodeValid(body.TwoFactorAuthcode, body.userId); 
    if (isCodeValid === false) {
      throw new UnauthorizedException('Wrong authentication code');
    }
    delete body.TwoFactorAuthcode;
    const token = await this.authService.login(body);
    res.cookie('ts_token', token.access_token, { httpOnly: false });
    res.send(null);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '42oauth 로그아웃' })
  @ApiResponse ({
    status: 200,
    description: '"로그아웃 성공시": [return value: null]',
  })
  @HttpCode(200)
  @Get('logout')
  logout(@Req() req, @Res() res) {
    res.clearCookie('ts_token');
    res.send(null);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'qr코드 불러오기' })
  @ApiResponse ({
    status: 200,
    description: '"Qrcode 요청 성공시": [qrcode 생성]',
  })
  @HttpCode(200)
  @Get('make-qrcode')
  async pipeQrCodeStream(@User() user, @Res() response) {
    const { otpauthUrl } = await this.authService.generateTwoFactorAuthenticationSecret(user.userId, user.email);
    return this.authService.pipeQrCodeStream(response, otpauthUrl);
  }
}


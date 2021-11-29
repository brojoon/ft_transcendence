import { Body, Controller, Get, HttpCode, NotFoundException, Param, Post, Req, Res, UnauthorizedException, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'common/decorators/user.decorator';
import { TwoFactorDto } from 'common/dto/two-factor.dto';
import { UserDto } from 'common/dto/user.dto';
import { UndefinedToNullInterceptor } from 'common/interceptors/undefinedToNull.interceptor';
import { Users } from 'src/entities/Users';
import { Repository } from 'typeorm';
import { AuthService } from './auth.service';
import { Intra42AuthGuard } from './guards/intra42-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('AUTH') // API문서 카테고리
@UseInterceptors(UndefinedToNullInterceptor) // 마지막 리턴값 undifined일경우 null로 바꿈
@Controller('api/auth')
export class AuthController {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: '!!반환값에 토큰있음 복사버튼 누르면됨!! 1차 인증 없이 아이디 생성(test용)'})
  @HttpCode(200)
  @Get('1/:oauthid/:id')
  async temMakeloginUser(@Param('oauthid') oauthid: number, @Param('id') id :string, @Res() res) {
    const user = {
      oauthId: +oauthid,
      username: id,
      userId: id,
      email: `${id}@naver.com`,
      profile: undefined
    }
    this.authService.Join(user.oauthId, user.username, user.userId, user.email, user.profile);
    const token = await this.authService.login(user);
    res.cookie('ts_token', token.access_token, { httpOnly: false });
    res.send(token.access_token);
  }

  @ApiOperation({ summary: '!!반환값에 토큰있음 복사버튼 누르면됨!!생성한 아이디로 로그인 하면서 토큰 다시 발급'})
  @HttpCode(200)
  @Get('2/:id')
  async temGetToken(@Param('id') id :string, @Res() res) {
    const result = await this.usersRepository.findOne({
      select: ['oauthId', 'userId', 'username', 'email', 'profile'],
      where: { userId: id },  
    });
    if (!result)
      throw new NotFoundException('유저 정보 없음');
    const user = {
      oauthId: +result.oauthId,
      userId: result.userId,
      email: result.email,
    }
    res.clearCookie('ts_token');
    const token = await this.authService.login(user);
    res.cookie('ts_token', token.access_token, { httpOnly: false });
    res.send(token.access_token);
  }

  @UseGuards(Intra42AuthGuard)
  @ApiOperation({ summary: '42oauth 로그인'})
  @ApiResponse ({
    status: 302,
    description: '로그인',
  })
  @HttpCode(302)
  @Get('42')
  async 42() {
  }

  @UseGuards(Intra42AuthGuard)
  @ApiOperation({ summary: '로그인 정보 콜백'})
  @ApiResponse ({
    status: 200,
    description: '"1차 인증 성공시": [return value: null] /// "2차 진입시": [return value: user(유저 정보)]',
    type: UserDto
  })
  @HttpCode(200)
  @Get('42/callback')
  async login(@Req() req, @Res() res) {
    const result: boolean = await this.authService.checktwofactorEnable(req.user.userId);
    if (result){
      res.cookie('userCookie', req.user);
      res.status(302).redirect('http://localhost:3090/two-factor')
    }else{
      const token = await this.authService.login(req.user);
      res.cookie('ts_token', token.access_token, { httpOnly: false });
      res.status(302).redirect('http://localhost:3090/home')
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
    if (!result)
      throw new UnauthorizedException('checktwofactorEnable valus is fales');
    const isCodeValid =  await this.authService.isTwoFactorAuthenticationCodeValid(body.TwoFactorAuthcode, body.userId); 
    if (isCodeValid === false)
      throw new UnauthorizedException('Wrong authentication code');
    delete body.TwoFactorAuthcode;
    const token = await this.authService.login(body);
    res.clearCookie('userCookie');
    res.cookie('ts_token', token.access_token, { httpOnly: false });
    res.send(null);
  }

  @ApiOperation({ summary: '로그아웃' })
  @ApiResponse ({
    status: 200,
    description: '"로그아웃 성공시": [return value: null]',
  })
  @HttpCode(200)
  @Get('logout')
  logout(@Res() res) {
    res.clearCookie('ts_token');
    res.clearCookie('userCookie');
    res.send(null);
  }

  @ApiBearerAuth('ts_token')
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

  @ApiBearerAuth('ts_token')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '2차 인증 true시 otp check' })
  @ApiResponse ({
    status: 200,
    description: '"otp 인증 성공시": return: true / 이거 ture확인 후 따로 이차인증 true api요청해야 됨',
  })
  @HttpCode(200)
  @Get('otpCodeCheck/:otp')
  async otpCodeCheck(@User() user: UserDto,  @Param('otp') optCode: string) {
    const isCodeValid =  await this.authService.isTwoFactorAuthenticationCodeValid(optCode, user.userId); 
    return isCodeValid;
  }
}


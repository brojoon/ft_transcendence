import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'src/entities/Users';
import * as bcrypt from 'bcrypt'
import { jwtConstants } from './constants';
import { UserDto } from 'common/dto/user.dto';
import { authenticator } from 'otplib';
import { toFileStream } from 'qrcode';
import { Connect } from 'src/entities/Connect';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    @InjectRepository(Connect) private connectRepository: Repository<Connect>,
    private readonly jwtService: JwtService,
  ) {}

  async isTwoFactorAuthenticationCodeValid(twoFactorAuthenticationCode: string, userId:string) {
    try {
      const result = await this.usersRepository.findOne({
        where: { userId },
        select: ['twoFactorAuth'],
      });
      return authenticator.verify({token: twoFactorAuthenticationCode,secret: result.twoFactorAuth})      
    } catch (error) {
      throw new ForbiddenException('isTwoFactorAuthenticationCodeValid 실패');
    }
  }

  async generateTwoFactorAuthenticationSecret(userId:string, email:string) {
    const secret = authenticator.generateSecret();
    const otpauthUrl = await authenticator.keyuri(email, jwtConstants.APP_NAME, secret);
    try{
      await this.usersRepository.createQueryBuilder()
        .update()
        .set({
          twoFactorAuth: `${secret}`,
        })
        .where('userId = :userId', { userId })
        .execute();
      return { secret, otpauthUrl };
    }catch{
      throw new ForbiddenException('유저 정보 업데이트 실패');
    }
  }

  async pipeQrCodeStream(stream: Response, otpauthUrl: string) {
    return toFileStream(stream, otpauthUrl);
  }

  async checktwofactorEnable(userId: string) {
    try {
      const result = await this.usersRepository.findOne({
        where: { userId },
        select: ['twofactorEnable'],
      });
      return result.twofactorEnable;     
    } catch (error) {
      throw new ForbiddenException('checktwofactorEnable 실패');
    }
  }

  async validateUser(oauthId: string, password: string): Promise<any> {
    const user = await this.usersRepository.findOne({
      where: { oauthId },
      select: ['oauthId', 'userId', 'username', 'email', 'profile', 'password'],
    });
    if (!user) {
      return null;
    }
    const result = await bcrypt.compare(jwtConstants.PASSWORD, user.password);
    if (result) {
      const { password, ...result } = user;
      return result;
    }
    throw new ForbiddenException('잘못된 접근입니다.');
  }

  async Join(oauthId: number, username:string, userId: string, email:string, profile:string) {
    const user =  await this.usersRepository.findOne({ where: { oauthId } });
    if (user)
      throw new ForbiddenException('이미 존재하는 사용자입니다');
    try {
      const hashedPassword = await bcrypt.hash(process.env.SECRET, 12);
      const newUser = new Users();
      newUser.oauthId = oauthId;
      newUser.userId = userId;
      newUser.username = userId;
      newUser.email = email;
      newUser.profile = profile;
      newUser.password = hashedPassword;
      await this.usersRepository.save(newUser);
      const connect = new Connect();
      connect.userId = userId;
      connect.state = true;
      await this.connectRepository.save(connect);
      return (true);      
    } catch (error) {
      throw new ForbiddenException('회원 가입 실패');
    }
  }

  async login(user: UserDto) {
    try {
      const payload = {
        oauthId: user.oauthId,
        username: user.username,
        userId: user.userId,
        email: user.email,
        profile: user.profile 
      };
      return {access_token: this.jwtService.sign(payload)};      
    } catch (error) {
      throw new ForbiddenException('토큰 로그인 실패');
    }
  }
}

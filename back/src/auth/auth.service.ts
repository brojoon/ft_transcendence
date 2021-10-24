import { ForbiddenException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Users } from 'src/entities/Users';
import * as bcrypt from 'bcrypt'
import { jwtConstants } from './constants';
import { UserDto } from 'common/dto/user.dto';
import { authenticator } from 'otplib';
import { toFileStream } from 'qrcode';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    private readonly jwtService: JwtService,
    private connection: Connection,
  ) {}

  async isTwoFactorAuthenticationCodeValid(twoFactorAuthenticationCode: string, userId:string) {
    const result = await this.usersRepository.findOne({
      where: { userId },
      select: ['twoFactorAuth'],
    });
    return authenticator.verify({token: twoFactorAuthenticationCode,secret: result.twoFactorAuth})
  }

  async generateTwoFactorAuthenticationSecret(userId:string, email:string) {
    // secret / otpauthUrl 생성
    const secret = authenticator.generateSecret();
    const otpauthUrl = authenticator.keyuri(email, jwtConstants.APP_NAME, secret);
  
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager
        .getRepository(Users)
        .update(
          {userId},
          {twoFactorAuth:secret}
        );
      await queryRunner.commitTransaction();
      return { secret, otpauthUrl };
    } catch (error){
      console.error(error);
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async pipeQrCodeStream(stream: Response, otpauthUrl: string) {
    return toFileStream(stream, otpauthUrl);
  }

  public getCookieWithJwtAccessToken(userId: string, isSecondFactorAuthenticated = false) {
    const payload = { userId, isSecondFactorAuthenticated };

    const token = this.jwtService.sign(payload, {
      secret: jwtConstants.TOKEN_SECRET,
      expiresIn: jwtConstants.TOKEN_TIME
    });
    var tomorrow = new Date();
    const exp = tomorrow.setUTCDate(tomorrow.getUTCDate() + 1)
    //`Authentication=${token}; HttpOnly; Path=/; Max-Age=${exp}`
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${jwtConstants.TOKEN_TIME}`;
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
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const user = await queryRunner.manager
      .getRepository(Users)
      .findOne({ where: { oauthId } });
    if (user) {
      throw new ForbiddenException('이미 존재하는 사용자입니다');
    }
    const hashedPassword = await bcrypt.hash(process.env.SECRET, 12);
    try {
      await queryRunner.manager
        .getRepository(Users)
        .save({
          oauthId,
          userId,
          username, 
          email,
          profile,
          password: hashedPassword
      });
      await queryRunner.commitTransaction();
      return true;
    } catch (error){
      console.error(error);
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async login(user: UserDto) {
    const payload = {
      oauthId: user.oauthId,
      username: user.username,
      userId: user.userId,
      email: user.email,
      profile: user.profile 
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connect } from 'src/entities/Connect';
import { Users } from 'src/entities/Users';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { GoogleStrategy } from './strategies/google.strategy';
import { Intra42Strategy } from './strategies/intra42.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
// import { KakaoStrategy } from './strategies/kakao.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '86400s' },
    }),
    TypeOrmModule.forFeature([Users, Connect]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, Intra42Strategy, GoogleStrategy],
  exports: [AuthService],
})
export class AuthModule {}

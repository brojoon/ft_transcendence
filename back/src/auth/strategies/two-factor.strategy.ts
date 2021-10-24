import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '../auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'src/entities/Users';
import { jwtConstants } from '../constants';

@Injectable()
export class JwtTwoFactorStrategy extends PassportStrategy(Strategy, 'jwt-two-factor') {
  constructor(@InjectRepository(Users) private usersRepository: Repository<Users>) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
        return request?.cookies?.Authentication;
      }]),
      secretOrKey: jwtConstants.TOKEN_SECRET
    });
  }
 
  async validate(payload) {
    const result = await this.usersRepository.findOne({
        where: { userId: payload.userId},
        select: ['twofactorEnable'],
      });
    if (result.twofactorEnable === false) {
      return payload.userId;
    }
    if (payload.isSecondFactorAuthenticated) {
      return payload.userId;
    }
    throw new UnauthorizedException('Wrong authentication code');
  }
}
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UserDto } from 'common/dto/user.dto';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants';

var cookieExtractor = function(req) {
  let token = null;
  if (req)
      token = String(req.headers.cookie);
  return token.substring(9, token.length);
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      //jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      jwtFromRequest: cookieExtractor,
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(user: UserDto) {
    return user;
  }
}

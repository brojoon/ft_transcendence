import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UserDto } from 'common/dto/user.dto';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants';

var isAlpha = function(ch){
  if (ch == ';')
    return false;
  else
    return true;
}

var cookieParser = function(obj){
  let str = obj["cookie"];
  let start = str.search("ts_token=");
  if (start == -1)
    return "-1";
  start += "ts_token=".length;
  let end = start;
  while (isAlpha(str[end]) && end < str.length){
    end++;
  }
  return str.substring(start, end);
}

var cookieExtractor = function(req) {
  var token = null;
  if (req)
  {
      token = cookieParser(req.headers);
      //console.log("\n\n\n\n", token);
      //token = req.Cookie['ts_token'];
  }
  else{
    console.log("noooooooooooooooooooooooooooooooooooooooooooooooooooooo\n\n\n\n", req);
  }
  return token;
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

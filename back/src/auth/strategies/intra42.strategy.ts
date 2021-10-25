import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
//import { Strategy } from 'passport-oauth2';
import { Strategy } from 'passport-42';
import { AuthService } from '../auth.service';
import { jwtConstants } from '../constants';
import { UserDto } from 'common/dto/user.dto';

@Injectable()
export class Intra42Strategy extends PassportStrategy(Strategy, '42') {
  constructor(private readonly authService: AuthService) {
    super({
        clientID: jwtConstants.CLIENT_ID,
        clientSecret: jwtConstants.CLIENT_SECRET,
        callbackURL: 'http://localhost:3095/api/auth/42/callback',
        scope: 'public',
    });
  }
  
  async validate(accessToken: string, refreshToken: string, profile: any){
    const { id, displayName, username,  photos, emails} = profile;
    const info: UserDto = { 
      oauthId:+id, 
      username:displayName,
      userId:username,
      email:emails[0].value,
      profile:photos[0].value};
    if (!info) 
      throw new UnauthorizedException();
    const user: UserDto = await this.authService.validateUser(String(info.oauthId), jwtConstants.PASSWORD);
    // 사용자가 있으면 사용자 정보 리턴
    if (user){
      return user;
    }
    const result = await this.authService.Join(info.oauthId, info.username, info.userId, info.email, info.profile);
    if (result){
      return info;
    }
  }
}


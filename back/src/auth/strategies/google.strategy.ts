import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserDto } from 'common/dto/user.dto';
import { jwtConstants } from '../constants';

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {

  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: 'http://42transcendence.ml:8081/api/auth/google/redirect',
      scope: ['email', 'profile'],//구글설정에서는 scope 따로 정해주지 않긴한데..
    });
  }

  async validate (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    // console.log("발리데이션 함수 호출");
    // console.log("=================================");
    // console.log(profile);
    // console.log("=================================");
    const {id} = profile;
    const oauthId = id;
    const userName = profile.name.givenName;
    const userId = userName;
    const email = profile.emails[0].value;
    const profile_photos = profile.photos[0].value;
    const info: UserDto = { 
      oauthId:+id, 
      username:userName,
      userId:userId,
      email,
      profile:profile_photos
    };
    if (!info) 
      throw new UnauthorizedException();
    const user: UserDto = await this.authService.validateUser(String(info.oauthId), jwtConstants.PASSWORD);
    if (user)
      return user;
    const result = await this.authService.Join(info.oauthId, info.username, info.userId, info.email, info.profile);
    if (result)
      return info;
    else
      console.log("(google strategy validation 함수에서) result값이 false")
  }

}


import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDto } from 'common/dto/user.dto';
import { jwtConstants } from '../constants';
import { AuthService } from '../auth.service';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy) {

  constructor(private readonly authService: AuthService) {
    super({
        clientID : jwtConstants.KAKAO_CLIENT_ID,
        clientSecret: jwtConstants.KAKAO_SECRET, // clientSecret을 사용하지 않는다면 넘기지 말거나 빈 스트링을 넘길 것
        callbackURL : jwtConstants.KAKAO_CALLBACK_URL
    })
  }

  async validate (accessToken: string, refreshToken: string, profile: any): Promise<any> {
    const {id} = profile;
    const oauthId = id;
    const userName = profile.username;
    const userId = userName;
    let email = profile._json.kakao_account.email;
    email = email ? email : "";
    const profile_photos = null;
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
        console.log("(google strategy validation 함수에서) result값이 false");
    }
}

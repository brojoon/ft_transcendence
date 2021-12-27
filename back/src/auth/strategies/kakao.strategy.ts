
import { PassportStrategy } from '@nestjs/passport';
// import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Strategy } from 'passport-kakao';
import { config } from 'dotenv';

import { Injectable } from '@nestjs/common';

config();

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy) {

  constructor() {
    super({
        clientID : "d95ea8012bf88a97af2828e546712f74",
        clientSecret: "", // clientSecret을 사용하지 않는다면 넘기지 말거나 빈 스트링을 넘길 것
        callbackURL : "http://34.82.79.134:8081/api/auth/kakao/redirect"
    })
  }

  async validate (accessToken: string, refreshToken: string, profile: any): Promise<any> {
    // console.log("발리데이션 함수 호출");
    // console.log("=================================");
    // console.log(profile);
    // console.log("=================================");
    const {id} = profile;
    const oauthId = id;
    const userName = profile.username;
    const userId = userName;
    let email = profile._json.kakao_account.email;
    email = email ? email : "";
    const profile_photos = null;
    // const userId = userName;
    // const email = profile.emails[0].value;
    // const profile_photos = profile.photos[0].value;
    const ret = {oauthId, userName, userId, email, profile_photos};
    return ret;

    const {name, emails, photos} = profile
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken
    }
    //return user;
    // done(null, user);
  }
}

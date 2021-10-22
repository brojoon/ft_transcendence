import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import axios from 'axios';
import { Strategy } from 'passport-42';
//import { lastValueFrom } from 'rxjs';
import { jwtConstants } from '../constants';

@Injectable()
export class Intra42Strategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
        authorizationURL: 'https://api.intra.42.fr/oauth/authorize?client_id=cfb705cdb7caf36fabcdda09c49daa121cdd955f15ee3f3aded9db22541aedd9&redirect_uri=http%3A%2F%2Flocalhost%3A3095%2Fauth%2F42%2Fcallback&response_type=code',
        tokenURL: 'https://api.intra.42.fr/oauth/token',
        clientID: jwtConstants.CLIENT_ID,
        clientSecret: jwtConstants.CLIENT_SECRET,
        callbackURL: 'http://localhost:3095/auth/42/callback',
        scope: 'public',
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, cb:any) {
		const { data } = await axios.get('https://api.intra.42.fr/v2/me', {
			headers: { Authorization: `Bearer ${accessToken}` },
		});
    if (!data) 
        throw new UnauthorizedException();
    console.log(data);
    return data;   
  }
}
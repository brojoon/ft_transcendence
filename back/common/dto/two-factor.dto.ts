import { ApiProperty, PickType } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { Users } from "src/entities/Users";

export class TwoFactorDto extends PickType(Users, [
  'oauthId',
  'username',
  'userId',
  'email',
  'profile'
  ] as const) {    
  @IsString()
  @ApiProperty({
    example: '592127',
    description: 'two-factor 인증코드',
    required: true
  })
  TwoFactorAuthcode: string;
}


import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class TwoFactorDto {
    @IsString()
    @ApiProperty({
      example: '592127',
      description: 'two-factor 인증',
      required: true
    })
    public TwoFactorAuthcode: string;
}


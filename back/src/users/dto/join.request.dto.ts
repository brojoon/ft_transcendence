import { ApiProperty, PickType } from "@nestjs/swagger";
import { Users } from "src/entities/Users";

//PickType 공부하기  중복 제거용
export class JoinRequestDto extends PickType(Users, [
    'oauthId',
    'username',
    'userId',
    'email'
] as const) {}

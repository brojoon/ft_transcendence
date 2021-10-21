import { ApiProperty, PickType } from "@nestjs/swagger";
import { Users } from "src/entities/Users";

//PickType 공부하기  중복 제거용
export class LoginRequestDto extends PickType(Users, [
    'username',
    'userId',
] as const) {}

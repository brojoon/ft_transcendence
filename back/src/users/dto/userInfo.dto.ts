import { PickType } from "@nestjs/swagger";
import { Users } from "src/entities/Users";

export class UserInfoDto extends PickType(Users, [
    'username',
    'userId',
    'email',
	'profile'
] as const) {}


import { PickType } from "@nestjs/swagger";
import { Users } from "src/entities/Users";

export class UserDto extends PickType(Users, [
    'oauthId',
    'username',
    'userId',
    'email',
	'profile'
] as const) {}


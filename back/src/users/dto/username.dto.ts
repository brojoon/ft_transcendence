import { PickType } from "@nestjs/swagger";
import { Users } from "src/entities/Users";

export class UsernameDto extends PickType(Users, [
	'username'
] as const) {}


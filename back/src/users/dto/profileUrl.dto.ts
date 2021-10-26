import { PickType } from "@nestjs/swagger";
import { Users } from "src/entities/Users";

export class ProfileUrl extends PickType(Users, [
    'userId',
	'profile'
] as const) {}


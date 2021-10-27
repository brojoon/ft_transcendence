import { PickType } from "@nestjs/swagger";
import { Friend } from "src/entities/Friend";

export class FriendListDto extends PickType(Friend, [
    'userId2',
] as const) {}


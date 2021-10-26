import { PickType } from "@nestjs/swagger";
import { Connect } from "src/entities/Connect";


export class UserConnetInfo extends PickType(Connect, [
    'userId',
    'state',
    'updatedAt'
] as const) {}


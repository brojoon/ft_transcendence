import { PickType } from "@nestjs/swagger";
import { Connect } from "src/entities/Connect";

export class UserConnetInfoDto extends PickType(Connect, [
    'userId',
    'state',
    'updatedAt'
] as const) {}


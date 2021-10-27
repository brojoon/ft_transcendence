import { PickType } from "@nestjs/swagger";
import { Dmcontent } from "src/entities/Dmcontent";

export class MessagetDto extends PickType(Dmcontent, [
    'message',
] as const) {}


import { PickType } from "@nestjs/swagger";
import { Block } from "src/entities/Block";

export class BlockListDto extends PickType(Block, [
    'userId2',
] as const) {}


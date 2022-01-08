import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ChannelStringDto{
    @ApiProperty({description:"message", example:"hi message"})//스웨거 body칸 있게 하려면
    @IsString()
    msg:string;
}
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ChannelDto{
    @ApiProperty({description:"password", example:"1234"})//스웨거 body칸 있게 하려면
    @IsString()
    password:string;
}
import { ApiProperty } from "@nestjs/swagger";
import { JoinRequestDto } from "src/users/dto/join.request.dto";

export class UserDto extends JoinRequestDto{
	@ApiProperty({
		required: true,
		example: 'load/profile/{id}.png',
		description: 'profile'
	})
	profile: string;
}
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Users } from "./Users";

@Index("FK_users_TO_friend_2", ["userId2"], {})
@Entity()
export class Friend {

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '사용자 아이디1',
    example: 'youngchoi',
    required: true
  })
  @Column("varchar", { primary: true, name: "userId1", length: 30 })
  userId1: string;
  
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '사용자 아이디2',
    example: 'youngchoi',
    required: true
  })
  @Column("varchar", { primary: true, name: "userId2", length: 30 })
  userId2: string;

  @ManyToOne(() => Users, (users) => users.Friend1, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "userId1", referencedColumnName: "userId" }])
  UserIds1: Users;

  @ManyToOne(() => Users, (users) => users.Friend2, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "userId2", referencedColumnName: "userId" }])
  UserIds2: Users;
}

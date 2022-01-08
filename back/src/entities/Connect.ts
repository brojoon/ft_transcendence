import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";
import { Column, Entity, JoinColumn, OneToOne, UpdateDateColumn } from "typeorm";
import { Users } from "./Users";

@Entity()
export class Connect {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '사용자 아이디',
    example: 'youngchoi',
    required: true
  })
  @Column("varchar", { primary: true, name: "userId", length: 30 })
  userId: string;

  @IsBoolean()
  @ApiProperty({
    description: '상태',
    example: 'true/false',
    required: true
  })
  @Column({ name: "state", width: 1, default: () => "'0'" })
  state: boolean;

  @ApiProperty({
    description: '미접속일경우:마지막접속 시간 / 접속중일 경우: 로그인한 시간',
    example: '2021-10-26T12:43:43.454Z',
    required: true
  })
  @UpdateDateColumn()
  updatedAt: Date | null;

  @OneToOne(() => Users, (users) => users.Connects, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "userId", referencedColumnName: "userId" }])
  User: Users;
}

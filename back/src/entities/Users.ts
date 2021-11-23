import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, OneToOne, UpdateDateColumn } from "typeorm";
import { Block } from "./Block";
import { Chatcontent } from "./Chatcontent";
import { Chatmember } from "./Chatmember";
import { Connect } from "./Connect";
import { Dmcontent } from "./Dmcontent";
import { Friend } from "./Friend";
import { History } from "./History";
import { IsEmail, IsNotEmpty, IsString, IsInt } from 'class-validator';
import { Blockmember } from './Blockmember';

@Entity()
export class Users {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '사용자 아이디',
    example: 'youngchoi',
    required: true
  })
  @Column("varchar", { primary: true, name: "userId", length: 30 })
  userId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '유저네임',
    example: '쌍문동 성기훈',
    required: true 
  })
  @Column("varchar", { name: "username", length: 30 })
  username: string;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    description: '42intra/google 식별 ID',
    example: '54612484714',
    required: true
  })
	@Column({ unique: true })
	oauthId: number;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: '이메일',
    example: 'youngchoi@42seoul.com',
    required: true
  })
  @Column("varchar", { name: "email", length: 30, unique: true })
  email: string;

  @IsString()
  @ApiProperty({
    example: '인터넷url or /upload/profile/ex.png',
    description: '프로필 경로',
    required: true
  })
  @Column("varchar", { name: "profile", nullable: true, length: 100 })
  profile: string | null;

  @Column("varchar", { name: 'password', length: 100, select: false })
  password: string;

  @Column("varchar", { name: 'twoFactorAuth', nullable: true, length: 200 })
  twoFactorAuth: string | null;

  @Column( { name: 'twofactorEnable',  default: () => "'0'" })
  twofactorEnable: boolean;

  @Column( { name: 'admin',  default: () => "'0'" })
  admin: boolean;

  @Column( { name: 'moderator',  default: () => "'0'" })
  moderator: boolean;

  @Column( { name: 'ban',  default: () => "'0'" })
  ban: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deleteAt: Date | null;

  @OneToMany(() => Block, (block) => block.userId1)
  Block1: Block[];

  @OneToMany(() => Block, (block) => block.userId2)
  Block2: Block[];

  @OneToMany(() => Chatcontent, (chatcontent) => chatcontent.User)
  Chatcontents: Chatcontent[];

  @OneToMany(() => Chatmember, (chatmember) => chatmember.User)
  Chatmembers: Chatmember[];

  @OneToOne(() => Connect, (connect) => connect.User)
  Connects: Connect;

  @OneToMany(() => Dmcontent, (dmcontent) => dmcontent.UserIds1)
  Dmcontent1: Dmcontent[];

  @OneToMany(() => Dmcontent, (dmcontent) => dmcontent.UserIds2)
  Dmcontent2: Dmcontent[];

  @OneToMany(() => Friend, (friend) => friend.UserIds1)
  Friend1: Friend[];

  @OneToMany(() => Friend, (friend) => friend.UserIds2)
  Friend2: Friend[];

  @OneToMany(() => History, (history) => history.UserIds1)
  History1: History[];

  @OneToMany(() => History, (history) => history.UserIds2)
  History2: History[];
  Blockmembers: any;

  @OneToMany(() => Blockmember, (blockmember) => blockmember.User)
  Blockmember: History[];
}

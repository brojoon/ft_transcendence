import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Dm } from "./Dm";
import { History } from "./History";
import { Users } from "./Users";

@Index("FK_dm_TO_dmContent_1", ["dmId"], {})
@Index("FK_users_TO_dmContent_1", ["userId1"], {})
@Index("FK_users_TO_dmContent_2", ["userId2"], {})
@Index("FK_history_TO_dmContent_1", ["historyId"], {})
@Entity()
export class Dmcontent {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { primary: true, name: "dmId" })
  dmId: number;

  @Column("varchar", { primary: true, name: "userId1", length: 30 })
  userId1: string;

  @Column("varchar", { primary: true, name: "userId2", length: 30 })
  userId2: string;
  
  @IsString()
  @ApiProperty({
    description: '메세지',
    example: '안녕하세요?',
  })
  @Column("text", { name: "message", nullable: true })
  message: string | null;

  @Column("int", { name: "match", default: () => "'0'" })
  match: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column("int", { name: "historyId", nullable: true })
  historyId: number | null;

  @ManyToOne(() => Dm, (dm) => dm.Dmcontents, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "dmId", referencedColumnName: "id" }])
  Dms: Dm;

  @ManyToOne(() => History, (history) => history.Dmcontents, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "histortId", referencedColumnName: "id" }])
  Historys: History;

  @ManyToOne(() => Users, (users) => users.Dmcontent1, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "userId1", referencedColumnName: "userId" }])
  UserIds1: Users;

  @ManyToOne(() => Users, (users) => users.Dmcontent2, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "userId2", referencedColumnName: "userId" }])
  UserIds2: Users;
}

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
import { Chatchannel } from "./Chatchannel";
import { Users } from "./Users";

@Index("FK_users_TO_chatContent_1", ["userId"], {})
@Index("FK_chatChannel_TO_chatContent_1", ["channelId"], {})
@Entity()
export class Chatcontent {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { primary: true, name: "userId", length: 30 })
  userId: string;

  @Column("int", { primary: true, name: "channelId" })
  channelId: number;

  @Column("text", { name: "message" })
  message: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Chatchannel, (chatchannel) => chatchannel.Chatcontents, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "channelId", referencedColumnName: "id" }])
  Channel: Chatchannel;

  @ManyToOne(() => Users, (users) => users.Chatcontents, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "userId", referencedColumnName: "userId" }])
  User: Users;
}

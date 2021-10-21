import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Chatchannel } from "./Chatchannel";
import { Users } from "./Users";

@Index("FK_chatChannel_TO_chatMember_1", ["channelId"], {})
@Entity("chatmember", { schema: "ts" })
export class Chatmember {
  @Column("varchar", { primary: true, name: "userId", length: 30 })
  userId: string;

  @Column("int", { primary: true, name: "channelId" })
  channelId: number;

  @Column("tinyint", { name: "mute", width: 1, default: () => "'0'" })
  mute: boolean;

  @Column("int", { name: "auth", default: () => "'0'" })
  auth: number;

  @Column("datetime", { name: "createdAt", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column("datetime", { name: "updatedAt", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;

  @ManyToOne(() => Chatchannel, (chatchannel) => chatchannel.Chatmembers, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "channelId", referencedColumnName: "id" }])
  Channel: Chatchannel;

  @ManyToOne(() => Users, (users) => users.Chatmembers, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "userId", referencedColumnName: "userId" }])
  User: Users;
}

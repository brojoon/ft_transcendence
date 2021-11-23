import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, UpdateDateColumn } from "typeorm";
import { Chatchannel } from "./Chatchannel";
import { Users } from "./Users";

@Entity()
export class Blockmember {
  @Column("varchar", { primary: true, name: "userId", length: 30 })
  userId: string;

  @Column("int", { primary: true, name: "channelId" })
  channelId: number;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Chatchannel, (chatchannel) => chatchannel.Blockmembers, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "channelId", referencedColumnName: "id" }])
  Channel: Chatchannel;

  @ManyToOne(() => Users, (users) => users.Blockmembers, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "userId", referencedColumnName: "userId" }])
  User: Users;
}

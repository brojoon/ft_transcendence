import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Chatcontent } from "./Chatcontent";
import { Chatmember } from "./Chatmember";

@Entity("chatchannel", { schema: "ts" })
export class Chatchannel {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 30 })
  name: string;

  @Column("int", { name: "type", default: () => "'0'" })
  type: number;

  @Column("varchar", { name: "password", nullable: true, length: 100 })
  password: string | null;

  @Column("datetime", { name: "createdAt", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column("datetime", { name: "updatedAt", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;

  @OneToMany(() => Chatcontent, (chatcontent) => chatcontent.Channel)
  Chatcontents: Chatcontent[];

  @OneToMany(() => Chatmember, (chatmember) => chatmember.Channel)
  Chatmembers: Chatmember[];
}

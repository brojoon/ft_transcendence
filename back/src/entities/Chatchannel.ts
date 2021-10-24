import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Chatcontent } from "./Chatcontent";
import { Chatmember } from "./Chatmember";

@Entity()
export class Chatchannel {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 30 })
  name: string;

  @Column("int", { name: "type", default: () => "'0'" })
  type: number;

  @Column("varchar", { name: "password", nullable: true, length: 100 })
  password: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deleteAt: Date | null;

  @OneToMany(() => Chatcontent, (chatcontent) => chatcontent.Channel)
  Chatcontents: Chatcontent[];

  @OneToMany(() => Chatmember, (chatmember) => chatmember.Channel)
  Chatmembers: Chatmember[];
}

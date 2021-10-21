import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Dmcontent } from "./Dmcontent";

@Entity("dm", { schema: "ts" })
export class Dm {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("datetime", { name: "createdAt", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column("datetime", { name: "updatedAt", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;

  @OneToMany(() => Dmcontent, (dmcontent) => dmcontent.Dms)
  Dmcontents: Dmcontent[];
}

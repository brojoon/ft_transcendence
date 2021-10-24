import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Dmcontent } from "./Dmcontent";

@Entity()
export class Dm {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Dmcontent, (dmcontent) => dmcontent.Dms)
  Dmcontents: Dmcontent[];
}

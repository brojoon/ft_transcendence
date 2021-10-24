import { Column, Entity, JoinColumn, OneToOne, UpdateDateColumn } from "typeorm";
import { Users } from "./Users";

@Entity()
export class Connect {
  @Column("varchar", { primary: true, name: "userId", length: 30 })
  userId: string;

  @Column({ name: "state", width: 1, default: () => "'0'" })
  state: boolean;

  @UpdateDateColumn()
  updatedAt: Date | null;

  @OneToOne(() => Users, (users) => users.Connects, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "userId", referencedColumnName: "userId" }])
  User: Users;
}

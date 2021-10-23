import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { Users } from "./Users";

@Entity("connect", { schema: "ts" })
export class Connect {
  @Column("varchar", { primary: true, name: "userId", length: 30 })
  userId: string;

  @Column("tinyint", { name: "state", width: 1, default: () => "'0'" })
  state: boolean;

  @Column("datetime", { name: "last", nullable: true })
  last: Date | null;

  @OneToOne(() => Users, (users) => users.Connects, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "userId", referencedColumnName: "userId" }])
  User: Users;
}

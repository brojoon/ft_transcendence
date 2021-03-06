import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Dmcontent } from "./Dmcontent";
import { Users } from "./Users";

@Index("FK_users_TO_history_1", ["userId1"], {})
@Index("FK_users_TO_history_2", ["userId2"], {})
@Entity()
export class History {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "userId1", length: 30 })
  userId1: string;

  @Column("varchar", { name: "userId2", length: 30 })
  userId2: string;

  @Column("int", { name: "playerOneJoin", default: () => "'0'" })
  playerOneJoin: number;

  @Column("int", { name: "playerTwoJoin", default: () => "'0'" })
  playerTwoJoin: number;

  @Column("int", { name: "user1Point", default: () => "'0'" })
  user1Point: number;

  @Column("int", { name: "user2Point", default: () => "'0'" })
  user2Point: number;

  @Column("varchar", { name: "winner", nullable: true, length: 30 })
  winner: string | null;

  @Column("varchar", { name: "loser", nullable: true, length: 30 })
  loser: string | null;

  @Column("int", { name: "state", default: () => "'0'" })
  state: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Dmcontent, (dmcontent) => dmcontent.Historys)
  Dmcontents: Dmcontent[];

  @ManyToOne(() => Users, (users) => users.History1, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "userId1", referencedColumnName: "userId" }])
  UserIds1: Users;

  @ManyToOne(() => Users, (users) => users.History2, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "userId2", referencedColumnName: "userId" }])
  UserIds2: Users;
}

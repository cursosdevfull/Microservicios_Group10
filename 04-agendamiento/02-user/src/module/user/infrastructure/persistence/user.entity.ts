import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "user" })
export class UserEntity {
  @PrimaryColumn()
  id: string;

  @Column({ type: "varchar", length: 50 })
  name: string;

  @Column({ type: "varchar", length: 50 })
  lastname: string;

  @Column({ type: "varchar", length: 50 })
  email: string;

  @Column({ type: "varchar", length: 150 })
  password: string;

  @Column({ type: "bool" })
  isActive: boolean;

  @Column({ type: "timestamp" })
  createdAt: Date;

  @Column({ type: "timestamp", nullable: true })
  updatedAt: Date | null;

  @Column({ type: "timestamp", nullable: true })
  deletedAt: Date | null;
}

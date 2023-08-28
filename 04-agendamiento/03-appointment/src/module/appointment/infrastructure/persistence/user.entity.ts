import { Column, Entity, ManyToMany, PrimaryColumn } from "typeorm";

import { RoleEntity } from "../../../role/infrastructure/persistence/role.entity";

@Entity({ name: "user" })
export class UserEntity {
  @PrimaryColumn()
  id: string;

  @Column({ type: "varchar", length: 50 })
  name: string;

  @Column({ type: "varchar", length: 50 })
  lastname: string;

  @Column({ type: "varchar", length: 50, unique: true })
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

  @ManyToMany(() => RoleEntity, (role) => role.users)
  roles: RoleEntity[];
}

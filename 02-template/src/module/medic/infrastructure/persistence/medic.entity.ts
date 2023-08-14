import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

import { AddressEntity } from "./address.entity";
import { DiseaseEntity } from "./disease.entity";

@Entity({ name: "medic" })
export class MedicEntity {
  @PrimaryColumn()
  id: string;

  @Column({ type: "varchar", length: 50 })
  name: string;

  @Column({ type: "varchar", length: 50 })
  lastname: string;

  @Column({ type: "varchar", length: 8, unique: true })
  dni: string;

  @Column({ type: "varchar", length: 50 })
  email: string;

  @Column({ type: "varchar", length: 10 })
  cmp: string;

  @Column({ type: "varchar", length: 20, nullable: true })
  phone: string;

  @Column({ type: "varchar", length: 1, nullable: true })
  gender: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  nationality: string;

  @Column({ type: "varchar", length: 36, nullable: true })
  speciality: string;

  @Column({ type: "int", nullable: true })
  age: number;

  @Column({ type: "bool" })
  isActive: boolean;

  @Column({ type: "timestamp" })
  createdAt: Date;

  @Column({ type: "timestamp", nullable: true })
  updatedAt: Date | null;

  @Column({ type: "timestamp", nullable: true })
  deletedAt: Date | null;

  @OneToMany(() => AddressEntity, (address) => address.medic, { cascade: true })
  addresses: AddressEntity[];

  @OneToMany(() => DiseaseEntity, (disease) => disease.medic, { cascade: true })
  diseases: DiseaseEntity[];
}

import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

import { MedicEntity } from "./medic.entity";

@Entity({ name: "address" })
export class AddressEntity {
  @PrimaryColumn()
  id: string;

  @Column({ type: "varchar", length: 50 })
  street: string;

  @Column({ type: "varchar", length: 5 })
  number: string;

  @Column({ type: "varchar", length: 50 })
  complement: string;

  @ManyToOne(() => MedicEntity, (medic) => medic.addresses)
  medic: MedicEntity;
}

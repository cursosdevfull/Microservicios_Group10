import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

import { MedicEntity } from "./medic.entity";

@Entity({ name: "disease" })
export class DiseaseEntity {
  @PrimaryColumn()
  id: string;

  @Column({ type: "varchar", length: 50 })
  name: string;

  @ManyToOne(() => MedicEntity, (medic) => medic.diseases)
  medic: MedicEntity;
}

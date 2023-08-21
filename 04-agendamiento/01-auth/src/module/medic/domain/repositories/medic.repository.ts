import { Result } from "neverthrow";

import { Medic } from "../roots/medic";

export type MedicPage = { results: Medic[]; total: number };
export type MedicResult = Result<Medic, Error>;
export type MedicListResult = Result<Medic[], Error>;
export type MedicPageResult = Result<MedicPage, Error>;

export interface MedicRepository {
  save(medic: Medic): Promise<MedicResult>;
  getAll(): Promise<MedicListResult>;
  getById(id: string): Promise<MedicResult>;
  getByPage(page: number, size: number): Promise<MedicPageResult>;
}

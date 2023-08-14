import { err, ok } from "neverthrow";

import db from "../../../bootstrap/mysql";
import {
  MedicListResult,
  MedicPageResult,
  MedicRepository,
  MedicResult,
} from "../domain/repositories/medic.repository";
import { Medic } from "../domain/roots/medic";
import { MedicSaveDto } from "./dtos/medic-save.dto";
import { MedicDatabaseException } from "./exceptions/medic-database.exception";
import { MedicEntity } from "./persistence/medic.entity";

export class MedicInfrastructure implements MedicRepository {
  async save(medic: Medic): Promise<MedicResult> {
    const repository = db.getDataSource().getRepository(MedicEntity);

    try {
      await repository.save(MedicSaveDto.fromDomainToData(medic));
      return ok(medic);
    } catch (error) {
      return err(new MedicDatabaseException(error.message));
    }
  }
  getAll(): Promise<MedicListResult> {
    throw new Error("Method not implemented.");
  }
  getById(id: string): Promise<MedicResult> {
    throw new Error("Method not implemented.");
  }
  getByPage(page: number, size: number): Promise<MedicPageResult> {
    throw new Error("Method not implemented.");
  }
}

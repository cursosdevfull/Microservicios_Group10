import { MedicRepository } from "../domain/repositories/medic.repository";
import { Medic } from "../domain/roots/medic";

export class MedicApplication {
  constructor(private readonly repository: MedicRepository) {}

  async save(medic: Medic) {
    return await this.repository.save(medic);
  }

  async getAll() {
    return await this.repository.getAll();
  }

  async getById(id: string) {
    return await this.repository.getById(id);
  }

  async getByPage(page: number, size: number) {
    return await this.repository.getByPage(page, size);
  }
}

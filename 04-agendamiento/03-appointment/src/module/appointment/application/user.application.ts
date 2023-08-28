import { UserRepository } from "../domain/repositories/user.repository";
import { User } from "../domain/roots/user";

export class UserApplication {
  constructor(private readonly repository: UserRepository) {}

  async save(user: User) {
    return await this.repository.save(user);
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

  async getByEmail(email: string) {
    return await this.repository.getByEmail(email);
  }
}

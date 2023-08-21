import { err, ok } from "neverthrow";

import db from "../../../bootstrap/mysql";
import {
  UserListResult,
  UserPageResult,
  UserRepository,
  UserResult,
} from "../domain/repositories/user.repository";
import { User } from "../domain/roots/user";
import { UserSaveDto } from "./dtos/user-save.dto";
import { UserDatabaseException } from "./exceptions/user-database.exception";
import { UserEntity } from "./persistence/user.entity";

export class UserInfrastructure implements UserRepository {
  async save(user: User): Promise<UserResult> {
    const repository = db.getDataSource().getRepository(UserEntity);

    try {
      await repository.save(UserSaveDto.fromDomainToData(user));
      return ok(user);
    } catch (error) {
      return err(new UserDatabaseException(error.message));
    }
  }
  getAll(): Promise<UserListResult> {
    throw new Error("Method not implemented.");
  }
  getById(id: string): Promise<UserResult> {
    throw new Error("Method not implemented.");
  }
  getByPage(page: number, size: number): Promise<UserPageResult> {
    throw new Error("Method not implemented.");
  }
}

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
import { UserDto } from "./dtos/user.dto";
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
  async getAll(): Promise<UserListResult> {
    const repository = db.getDataSource().getRepository(UserEntity);

    try {
      const users = await repository.find({
        where: { isActive: true },
        relations: ["roles"],
      });
      return ok((await UserDto.fromDataToDomain(users)) as User[]);
    } catch (error) {
      return err(new UserDatabaseException(error.message));
    }
  }
  async getById(id: string): Promise<UserResult> {
    const repository = db.getDataSource().getRepository(UserEntity);

    try {
      const users = await repository.find({
        where: { id, isActive: true },
        relations: ["roles"],
      });
      return ok((await UserDto.fromDataToDomain(users)) as User);
    } catch (error) {
      return err(new UserDatabaseException(error.message));
    }
  }
  async getByPage(page: number, size: number): Promise<UserPageResult> {
    const repository = db.getDataSource().getRepository(UserEntity);

    try {
      const [records, total] = await repository.findAndCount({
        where: { isActive: true },
        relations: ["roles"],
        skip: page,
        take: size,
      });
      const users = await UserDto.fromDataToDomain(records);
      return ok({ results: users as User[], total });
    } catch (error) {
      return err(new UserDatabaseException(error.message));
    }
  }

  async getByEmail(email: string): Promise<UserResult> {
    const repository = db.getDataSource().getRepository(UserEntity);

    try {
      const users = await repository.find({
        where: { email, isActive: true },
        relations: ["roles"],
      });
      return ok((await UserDto.fromDataToDomain(users)) as User);
    } catch (error) {
      return err(new UserDatabaseException(error.message));
    }
  }
}

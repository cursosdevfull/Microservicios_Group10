import { User } from "../../domain/roots/user";
import { UserFactory } from "../../domain/roots/user.factory";
import { UserEntity } from "../persistence/user.entity";

export class UserDto {
  static async fromDataToDomain(
    data: UserEntity | UserEntity[]
  ): Promise<User | User[]> {
    if (Array.isArray(data)) {
      for (const user of data) {
        return await UserDto.fromDataToDomain(user);
      }
    }

    const userInfo = data as UserEntity;

    const user = await UserFactory.create({
      id: userInfo.id,
      name: userInfo.name,
      lastname: userInfo.lastname,
      email: userInfo.email,
      password: userInfo.password,
      createdAt: userInfo.createdAt,
      updatedAt: userInfo.updatedAt,
      deletedAt: userInfo.deletedAt,
      isActive: userInfo.isActive,
      roles: userInfo.roles ? userInfo.roles.map((role) => role.id) : [],
    });

    return user;
  }
}

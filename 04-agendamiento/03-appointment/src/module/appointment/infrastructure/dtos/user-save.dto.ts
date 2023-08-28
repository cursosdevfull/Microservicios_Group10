import { RoleEntity } from "../../../role/infrastructure/persistence/role.entity";
import { User } from "../../domain/roots/user";
import { UserEntity } from "../persistence/user.entity";

export class UserSaveDto {
  static fromDomainToData(user: User): UserEntity {
    const properties: any = user.properties();

    const entity = new UserEntity();
    entity.id = properties.id;
    entity.name = properties.name;
    entity.lastname = properties.lastname;
    entity.email = properties.email;
    entity.password = properties.password;
    entity.createdAt = properties.createdAt;
    entity.updatedAt = properties.updatedAt;
    entity.deletedAt = properties.deletedAt;
    entity.isActive = properties.isActive;
    entity.roles = properties.roles
      ? properties.roles.map((role: any) => {
          const roleEntity = new RoleEntity();
          roleEntity.id = role;
          return roleEntity;
        })
      : [];
    return entity;
  }
}

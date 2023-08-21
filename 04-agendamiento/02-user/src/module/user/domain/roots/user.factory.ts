import { BCrypt } from "../services/bcrypt";
import { IdVO } from "../value-objects/id.vo";
import { User, UserProps } from "./user";

export class UserFactory {
  private constructor() {}

  static async create(props: UserProps): Promise<User> {
    const idResult = IdVO.create(props.id);
    if (idResult.isErr()) throw idResult.error;

    props.password = await BCrypt.hash(props.password);

    return new User(props);
  }
}

import { EmailVO } from "../value-objects/email.vo";
import { Auth, AuthEssentials } from "./auth";

export class AuthFactory {
  private constructor() {}

  static create(props: AuthEssentials): Auth {
    console.log("PROPS", props);
    const emailResult = EmailVO.create(props.email);
    if (emailResult.isErr()) throw emailResult.error;

    return new Auth(props);
  }
}

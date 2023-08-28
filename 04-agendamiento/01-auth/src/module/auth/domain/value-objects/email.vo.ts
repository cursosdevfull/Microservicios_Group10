import { err, ok, Result } from "neverthrow";

import { EmailException } from "../exceptions/email.exception";

export type EmailVOResult = Result<EmailVO, EmailException>;
export class EmailVO {
  private constructor(private readonly value: string) {}
  static create(value: string): EmailVOResult {
    console.log("VALUE", value);
    const pattern =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const patternEmail = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
    if (value.match(pattern)) return ok(new EmailVO(value));

    return err(new EmailException());
  }

  getvalue(): string {
    return this.value;
  }
}

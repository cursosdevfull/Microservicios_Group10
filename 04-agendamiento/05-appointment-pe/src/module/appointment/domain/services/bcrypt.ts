import * as bcrypt from "bcryptjs";

export class BCrypt {
  static hash(txt: string) {
    return bcrypt.hash(txt, 10);
  }
}

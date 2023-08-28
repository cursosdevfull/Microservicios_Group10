import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

import { Parameter } from "../../../core/parameter";

export class AuthService {
  static async validatePassword(
    password: string,
    passwordHash: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, passwordHash);
  }

  static generateAccessToken(
    name: string,
    lastname: string,
    email: string,
    roles: number[]
  ): string {
    return jwt.sign({ name, lastname, email, roles }, Parameter.JWT_SECRET, {
      expiresIn: "2m",
    });
  }

  static generateRefreshToken(): string {
    return uuidv4();
  }

  static validateAccessToken(accessToken: string) {
    try {
      return jwt.verify(accessToken, Parameter.JWT_SECRET);
    } catch (error) {
      return null;
    }
  }
}

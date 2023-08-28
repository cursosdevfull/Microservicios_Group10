import axios from "axios";
import { err, ok } from "neverthrow";

import { Parameter } from "../../../core/parameter";
import {
  AuthRepository,
  UserResult,
} from "../domain/repositories/auth.repository";
import { AuthDatabaseException } from "./exceptions/auth-database.exception";

export class AuthInfrastructure implements AuthRepository {
  async getUserByEmail(email: string): Promise<UserResult> {
    try {
      const response = await axios.post(Parameter.SERVICE_USER_BY_EMAIL, {
        email,
      });
      return ok(response.data);
    } catch (error) {
      return err(new AuthDatabaseException(error.message));
    }
  }
}

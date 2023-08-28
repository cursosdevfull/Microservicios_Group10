import { Result } from "neverthrow";

import { User } from "../entities/user";

export type AuthTokens = { accessToken: string; refreshToken: string };
export type UserResult = Result<User, Error>;

export interface AuthRepository {
  getUserByEmail(email: string): Promise<UserResult>;
}

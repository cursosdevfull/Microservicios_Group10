import { Result } from "neverthrow";

import { User } from "../entities/user";

export type AuthTokens = { accessToken: string; refreshToken: string };
export type UserResult = Result<User, Error>;
export type RequestResult = Result<any, Error>;

export interface ApiRepository {
  requestByType(url: string, method: string, data: any): Promise<RequestResult>;
}

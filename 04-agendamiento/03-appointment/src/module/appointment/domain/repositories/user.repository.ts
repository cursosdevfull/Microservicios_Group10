import { Result } from "neverthrow";

import { User } from "../roots/user";

export type UserPage = { results: User[]; total: number };
export type UserResult = Result<User, Error>;
export type UserListResult = Result<User[], Error>;
export type UserPageResult = Result<UserPage, Error>;

export interface UserRepository {
  save(user: User): Promise<UserResult>;
  getAll(): Promise<UserListResult>;
  getById(id: string): Promise<UserResult>;
  getByPage(page: number, size: number): Promise<UserPageResult>;
  getByEmail(id: string): Promise<UserResult>;
}

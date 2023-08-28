import { Result } from "neverthrow";

import {
  ApiRepository,
  AuthTokens,
} from "../domain/repositories/api.repository";

export type AuthLoginResult = Result<AuthTokens, Error>;
export class ApiApplication {
  constructor(private readonly repository: ApiRepository) {}

  async endpointRequest(url: string, method: string, data: any) {
    return await this.repository.requestByType(url, method, data);
  }
}

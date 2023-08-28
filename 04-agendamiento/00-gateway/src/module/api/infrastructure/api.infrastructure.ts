import axios, { AxiosRequestConfig } from "axios";
import { err, ok } from "neverthrow";

import { IError } from "../../../core/utils/ierror.interface";
import {
  ApiRepository,
  RequestResult,
} from "../domain/repositories/api.repository";

export class ApiInfrastructure implements ApiRepository {
  async requestByType(
    url: string,
    method: string,
    data: any
  ): Promise<RequestResult> {
    const request: AxiosRequestConfig<any> = {
      method,
      url,
      responseType: "json",
      data,
    };

    try {
      const result = await axios.request(request);
      return ok(result.data);
    } catch (error) {
      const objError: IError = new Error(error.response.data.message);
      objError.status = error.response.status;
      objError.stack = error.response.data.stack;
      return err(objError);
    }
  }
}

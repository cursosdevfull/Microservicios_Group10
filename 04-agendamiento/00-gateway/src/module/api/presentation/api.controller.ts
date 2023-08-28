import { NextFunction, Request, Response } from "express";

import { Parameter } from "../../../core/parameter";
import { ApiApplication } from "../application/api.application";

export class ApiController {
  constructor(private readonly application: ApiApplication) {}
  async login(req: Request, res: Response, next: NextFunction) {
    const data = req.body;

    const result = await this.application.endpointRequest(
      Parameter.SERVICE_AUTH_LOGIN,
      "POST",
      data
    );

    res.json(result);
  }

  async getUsers(req: Request, res: Response, next: NextFunction) {
    const result = await this.application.endpointRequest(
      Parameter.SERVICE_USER_LIST,
      "GET",
      null
    );
    res.json(result);
  }

  async validateToken(req: Request, res: Response, next: NextFunction) {
    const data = req.body;

    const result = await this.application.endpointRequest(
      Parameter.SERVICE_AUTH_VALIDATE_TOKEN,
      "POST",
      data
    );

    if (result.isErr()) {
      return next(result.error);
    }

    res.json(result);
  }
}

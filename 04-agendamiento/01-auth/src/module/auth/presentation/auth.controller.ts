import { NextFunction, Request, Response } from "express";

import { AuthApplication } from "../application/auth.application";
import { AuthFactory } from "../domain/roots/auth.factory";

export class AuthController {
  constructor(private readonly application: AuthApplication) {}
  async login(req: Request, res: Response, next: NextFunction) {
    console.log("BODY", req.body);
    const { email, password } = req.body;
    const auth = AuthFactory.create({ email, password });

    const authLoginResult = await this.application.login(auth);
    if (authLoginResult.isErr()) {
      return next(authLoginResult.error);
    }

    res.json(authLoginResult.value);
  }

  async validateToken(req: Request, res: Response, next: NextFunction) {
    const { accessToken } = req.body;

    const authValidateTokenResult = await this.application.validateToken(
      accessToken
    );
    if (authValidateTokenResult.isErr()) {
      return next(authValidateTokenResult.error);
    }

    res.json(authValidateTokenResult.value);
  }
}

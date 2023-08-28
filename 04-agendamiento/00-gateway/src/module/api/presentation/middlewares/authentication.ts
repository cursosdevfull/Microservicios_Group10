import { NextFunction, Request, Response } from "express";

import { Parameter } from "../../../../core/parameter";
import { IError } from "../../../../core/utils/ierror.interface";
import { ApiApplication } from "../../application/api.application";

export class Authentication {
  static canActivate(application: ApiApplication) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const authorization = req.headers["authorization"];
      if (!authorization) {
        const error: IError = new Error("User unauthenticated");
        error.status = 401;
        return next(error);
      }

      const accessToken = authorization.split(" ")[1];
      console.log("access token", accessToken);
      if (!accessToken) {
        const error: IError = new Error("User unauthenticated");
        error.status = 401;
        return next(error);
      } else {
        const result = await application.endpointRequest(
          Parameter.SERVICE_AUTH_VALIDATE_TOKEN,
          "POST",
          { accessToken }
        );

        if (result.isErr()) {
          return next(result.error);
        }

        return next();
      }
    };
  }
}

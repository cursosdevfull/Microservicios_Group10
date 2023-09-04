import { NextFunction, Request, Response } from "express";

import { Parameter } from "../parameter";
import { IError } from "../utils/ierror.interface";
import logger from "../utils/logger";

interface IResponseError {
  message: string;
  status: number;
  stack?: string;
}
export class HandleError {
  static noFound(
    error: IError,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    next(error);
  }

  static generic(
    error: IError,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const responseError: IResponseError = {
      status: error.status || 500,
      message: error.message || "Generic error",
    };

    logger.error({ ...responseError, stack: error.stack || null });

    if (Parameter.ENVIRONMENT !== "production") {
      responseError.stack = error.stack || null;
    }

    res.status(responseError.status).json(responseError);
  }
}

import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";

import { IError } from "../utils/ierror.interface";

export class Validator {
  static execute(validators: Record<string, any>) {
    return async (req: Request, res: Response, next: NextFunction) => {
      for (const key in validators) {
        const validatorDto = validators[key];
        switch (key) {
          case "body":
            Object.assign(validatorDto, req.body);
            break;
          case "params":
            Object.assign(validatorDto, req.params);
            break;
          case "query":
            Object.assign(validatorDto, req.query);
            break;
          case "headers":
            Object.assign(validatorDto, req.headers);
            break;
          default:
            break;
        }

        console.log("validatorDto", validatorDto);

        const errors = await validate(validatorDto);

        if (errors.length > 0) {
          console.log("errors", JSON.stringify(errors, null, "\t"));
          const listErrors: string[] = [];
          for (const error of errors) {
            for (const constraint in error.constraints) {
              listErrors.push(error.constraints[constraint]);
            }

            /*for (const child of errors) {
              for (const child2 of child.children) {
                for (const child3 of child2.children) {
                  for (const key in child3.constraints) {
                    listErrors.push(child3.constraints[key]);
                  }
                }
                // listErrors.push(child.constraints[key]);
              }
            }*/
          }

          console.log("list", listErrors);

          const err: IError = new Error();
          err.name = "ValidationError";
          err.message = listErrors.join(", ");
          err.status = 411;

          return next(err);
        }
      }
      return next();
    };
  }
}

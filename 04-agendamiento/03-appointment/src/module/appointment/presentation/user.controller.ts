import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import { UserApplication } from "../application/user.application";
import { UserFactory } from "../domain/roots/user.factory";

export class UserController {
  constructor(private readonly application: UserApplication) {}
  async create(req: Request, res: Response, next: NextFunction) {
    const body = req.body;
    const id = uuidv4();
    const user = await UserFactory.create({
      id,
      ...body,
    });

    const userResult = await this.application.save(user);
    if (userResult.isErr()) {
      return next(userResult.error);
    }

    res.json(userResult.value);
  }
}

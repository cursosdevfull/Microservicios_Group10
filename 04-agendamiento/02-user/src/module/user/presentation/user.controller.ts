import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import { UserApplication } from "../application/user.application";
import { UserFactory } from "../domain/roots/user.factory";

export class UserController {
  constructor(private readonly application: UserApplication) {}
  async insert(req: Request, res: Response, next: NextFunction) {
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

  async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const userResult = await this.application.getById(id);
    if (userResult.isErr()) {
      return next(userResult.error);
    }

    const user = userResult.value;
    user.update(req.body);

    const userUpdateResult = await this.application.save(user);
    if (userUpdateResult.isErr()) {
      return next(userUpdateResult.error);
    }

    res.json(userUpdateResult.value);
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const userResult = await this.application.getById(id);
    if (userResult.isErr()) {
      return next(userResult.error);
    }

    const user = userResult.value;
    user.delete();

    const userDeleteResult = await this.application.save(user);
    if (userDeleteResult.isErr()) {
      return next(userDeleteResult.error);
    }

    res.json(userDeleteResult.value);
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    const userResult = await this.application.getAll();
    if (userResult.isErr()) {
      return next(userResult.error);
    }

    res.json(userResult.value);
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const userResult = await this.application.getById(id);
    if (userResult.isErr()) {
      return next(userResult.error);
    }

    res.json(userResult.value);
  }

  async getByPage(req: Request, res: Response, next: NextFunction) {
    const { page, size } = req.params;
    const userResult = await this.application.getByPage(
      Number(page),
      Number(size)
    );
    if (userResult.isErr()) {
      return next(userResult.error);
    }

    res.json(userResult.value);
  }

  async getByEmail(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;
    const userResult = await this.application.getByEmail(email);
    if (userResult.isErr()) {
      return next(userResult.error);
    }

    res.json(userResult.value);
  }
}

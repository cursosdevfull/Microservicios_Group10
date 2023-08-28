import { Router } from "express";

import { Validator } from "../../../core/presentation/validator";
import { UserApplication } from "../application/user.application";
import { UserRepository } from "../domain/repositories/user.repository";
import { UserInfrastructure } from "../infrastructure/user.infrastructure";
import { UserByEmailDto } from "./dtos/requests/user-by-email";
import { UserByIdDto } from "./dtos/requests/user-by-id";
import { UserByPageDto } from "./dtos/requests/user-by-page";
import { UserInsertDto } from "./dtos/requests/user-insert.dto";
import { UserUpdateDto } from "./dtos/requests/user-update";
import { UserController } from "./user.controller";

const repository: UserRepository = new UserInfrastructure();
const application = new UserApplication(repository);
const controller = new UserController(application);

class UserRoute {
  private router: Router;

  constructor() {
    this.router = Router();
    this.addRoutes();
  }

  getRouter() {
    this.router.get("/", controller.getAll.bind(controller));
    this.router.get(
      "/:id",
      Validator.execute({ params: new UserByIdDto() }),
      controller.getById.bind(controller)
    );
    this.router.get(
      "/:page/:size",
      Validator.execute({ params: new UserByPageDto() }),
      controller.getByPage.bind(controller)
    );
    this.router.post(
      "/",
      Validator.execute({ body: new UserInsertDto() }),
      controller.insert.bind(controller)
    );
    this.router.put(
      "/:id",
      Validator.execute({
        params: new UserByIdDto(),
        body: new UserUpdateDto(),
      }),
      controller.update.bind(controller)
    );
    this.router.delete(
      "/:id",
      Validator.execute({ params: new UserByIdDto() }),
      controller.delete.bind(controller)
    );
    this.router.post(
      "/user-by-email",
      Validator.execute({ body: new UserByEmailDto() }),
      controller.getByEmail.bind(controller)
    );

    return this.router;
  }

  addRoutes() {}
}

export default new UserRoute().getRouter();

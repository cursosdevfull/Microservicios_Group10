import { Router } from "express";

import { Validator } from "../../../core/presentation/validator";
import { UserApplication } from "../application/user.application";
import { UserRepository } from "../domain/repositories/user.repository";
import { UserInfrastructure } from "../infrastructure/user.infrastructure";
import { UserInsertDto } from "./dtos/requests/user-insert.dto";
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
    this.router.get("/:id", controller.getById.bind(controller));
    this.router.get("/:page/:size", controller.getByPage.bind(controller));
    this.router.post(
      "/",
      Validator.execute({ body: new UserInsertDto() }),
      controller.insert.bind(controller)
    );
    this.router.put("/:id", controller.update.bind(controller));
    this.router.delete("/:id", controller.delete.bind(controller));

    return this.router;
  }

  addRoutes() {}
}

export default new UserRoute().getRouter();

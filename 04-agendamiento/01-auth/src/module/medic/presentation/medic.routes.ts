import { Router } from "express";

import { Validator } from "../../../core/presentation/validator";
import { MedicApplication } from "../application/medic.application";
import { MedicRepository } from "../domain/repositories/medic.repository";
import { MedicInfrastructure } from "../infrastructure/medic.infrastructure";
import { MedicInsertDto } from "./dtos/requests/medic-insert.dto";
import { MedicController } from "./medic.controller";

const repository: MedicRepository = new MedicInfrastructure();
const application = new MedicApplication(repository);
const controller = new MedicController(application);

class MedicRoute {
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
      Validator.execute({ body: new MedicInsertDto() }),
      controller.insert.bind(controller)
    );
    this.router.put("/:id", controller.update.bind(controller));
    this.router.delete("/:id", controller.delete.bind(controller));

    return this.router;
  }

  addRoutes() {}
}

export default new MedicRoute().getRouter();

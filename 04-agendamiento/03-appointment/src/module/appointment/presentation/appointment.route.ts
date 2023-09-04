import { Router } from "express";

import { Validator } from "../../../core/presentation/validator";
import { AppointmentApplication } from "../application/appointment.application";
import { AppointmentRepository } from "../domain/repositories/appointment.repository";
import { AppointmentInfrastructure } from "../infrastructure/appointment.infrastructure";
import { AppointmentController } from "./appointment.controller";
import { AppointmentCreateDto } from "./dtos/requests/appointment-create";

const repository: AppointmentRepository = new AppointmentInfrastructure();
const application = new AppointmentApplication(repository);
const controller = new AppointmentController(application);

class AppointmentRoute {
  private router: Router;

  constructor() {
    this.router = Router();
  }

  getRouter() {
    this.router.post(
      "/",
      Validator.execute({ body: new AppointmentCreateDto() }),
      controller.create.bind(controller)
    );

    return this.router;
  }
}

export default new AppointmentRoute().getRouter();

import { Router } from "express";

import { ApiApplication } from "../application/api.application";
import { ApiRepository } from "../domain/repositories/api.repository";
import { ApiInfrastructure } from "../infrastructure/api.infrastructure";
import { ApiController } from "./api.controller";
import { Authentication } from "./middlewares/authentication";

const repository: ApiRepository = new ApiInfrastructure();
const application = new ApiApplication(repository);
const controller = new ApiController(application);

class ApiRoute {
  private router: Router;

  constructor() {
    this.router = Router();
    this.addRoutes();
  }

  getRouter() {
    this.router.post("/auth/login", controller.login.bind(controller));
    this.router.post("/appointment", controller.appointment.bind(controller));
    this.router.get(
      "/usuarios",
      Authentication.canActivate(application),
      controller.getUsers.bind(controller)
    );
    this.router.post(
      "/auth/validate-token",
      controller.validateToken.bind(controller)
    );

    return this.router;
  }

  addRoutes() {}
}

export default new ApiRoute().getRouter();

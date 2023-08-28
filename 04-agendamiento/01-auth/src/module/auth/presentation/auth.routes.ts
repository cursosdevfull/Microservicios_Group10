import { Router } from "express";

import { AuthApplication } from "../application/auth.application";
import { AuthRepository } from "../domain/repositories/auth.repository";
import { AuthInfrastructure } from "../infrastructure/auth.infrastructure";
import { AuthController } from "./auth.controller";

const repository: AuthRepository = new AuthInfrastructure();
const application = new AuthApplication(repository);
const controller = new AuthController(application);

class AuthRoute {
  private router: Router;

  constructor() {
    this.router = Router();
    this.addRoutes();
  }

  getRouter() {
    this.router.post("/login", controller.login.bind(controller));
    this.router.post(
      "/validate-token",
      controller.validateToken.bind(controller)
    );

    return this.router;
  }

  addRoutes() {}
}

export default new AuthRoute().getRouter();

import { Router } from 'express';

import { Validator } from '../../../core/presentation/validator';
import { UserApplication } from '../application/user.application';
import { UserRepository } from '../domain/repositories/user.repository';
import { UserInfrastructure } from '../infrastructure/user.infrastructure';
import { AppointmentCreateDto } from './dtos/requests/appointment-create';
import { UserController } from './user.controller';

const repository: UserRepository = new UserInfrastructure();
const application = new UserApplication(repository);
const controller = new UserController(application);

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

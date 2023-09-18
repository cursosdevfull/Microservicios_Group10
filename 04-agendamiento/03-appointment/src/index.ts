import dotenv from "dotenv";

import app from "./app";
import RabbitMQBootstrap from "./bootstrap/rabbitmq";
import ServerBootstrap from "./bootstrap/server";
import logger from "./core/utils/logger";
import { AppointmentApplication } from "./module/appointment/application/appointment.application";
import { AppointmentRepository } from "./module/appointment/domain/repositories/appointment.repository";
import { AppointmentInfrastructure } from "./module/appointment/infrastructure/appointment.infrastructure";
import { AppointmentController } from "./module/appointment/presentation/appointment.controller";

dotenv.config();

const repository: AppointmentRepository = new AppointmentInfrastructure();
const application = new AppointmentApplication(repository);
const controller = new AppointmentController(application);

const server = new ServerBootstrap(app);
const rabbitmq = new RabbitMQBootstrap();
//const mysql = new MySQLBootstrap();
//const redis = new RedisBootstrap();

(async () => {
  try {
    const listPromises = [
      server.initialize(),
      rabbitmq.initialize(),
      //mysql.initialize(),
      //redis.initialize(),
    ];

    await Promise.all(listPromises);
    await controller.listen();

    //logger.info("MySQL connected successfully");
  } catch (error) {
    console.log("Error initializing services");
    logger.error(error);
    server.close();
    //mysql.close();
  }
})();

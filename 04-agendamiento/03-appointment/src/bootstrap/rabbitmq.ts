import amqp from "amqplib";

import { Parameter } from "../core/parameter";
import logger from "../core/utils/logger";
import { Bootstrap, BootstrapReturn } from "./bootstrap";

export default class RabbitMQBootstrap implements Bootstrap {
  static channel: amqp.Channel;
  initialize(): Promise<BootstrapReturn> {
    return new Promise(async (resolve, reject) => {
      const host = Parameter.RABBIT_HOST;

      try {
        const connection = await amqp.connect(`amqp://${host}`);
        RabbitMQBootstrap.channel = await connection.createChannel();
        logger.info(`RabbitMQ connected on ${host}`);
        resolve(true);
      } catch (error) {
        logger.error(error);
        reject(error);
      }
    });
  }
  close(): void {
    throw new Error("Method not implemented.");
  }
}

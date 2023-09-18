import RabbitMQBootstrap from "../../../bootstrap/rabbitmq";
import logger from "../../../core/utils/logger";
import { AppointmentRepository } from "../domain/repositories/appointment.repository";

export class AppointmentApplication {
  constructor(private readonly repository: AppointmentRepository) {
    this.consumer = this.consumer.bind(this);
  }

  async receive() {
    await this.repository.receive(this.consumer);
  }

  async consumer(message: any) {
    if (message) {
      //RabbitMQBootstrap.channel.ack(message);
      RabbitMQBootstrap.channel.reject(message, false);
      logger.info(`Message received: ${message.content.toString()}`);

      await this.repository.sendError(JSON.parse(message.content.toString()));
    }
  }
}

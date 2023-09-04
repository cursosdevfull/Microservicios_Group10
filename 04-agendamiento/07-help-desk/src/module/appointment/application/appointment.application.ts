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

  consumer(message: any) {
    if (message) {
      RabbitMQBootstrap.channel.ack(message);
      logger.info(`Message received: ${message.content.toString()}`);
    }
  }
}

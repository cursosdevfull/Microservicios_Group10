import { ok } from "neverthrow";

import RabbitMQBootstrap from "../../../bootstrap/rabbitmq";
import { Parameter } from "../../../core/parameter";
import {
  AppoinmentResult,
  AppointmentRepository,
} from "../domain/repositories/appointment.repository";
import { Appoinment } from "../domain/roots/appointment";

export class AppointmentInfrastructure implements AppointmentRepository {
  async receive(consumer: (message: any) => void) {
    const channel = RabbitMQBootstrap.channel;
    const exchangeName = Parameter.EXCHANGE_NAME;
    const exchangeType = Parameter.EXCHANGE_TYPE;
    const exchangeOptions = { durable: true };
    const routingKey = Parameter.ROUTING_KEY;
    const exchangeNameDLQ = Parameter.EXCHANGE_NAME_DLQ;
    const routingKeyDLQ = Parameter.ROUTING_KEY_DLQ;

    await channel.assertExchange(exchangeName, exchangeType, exchangeOptions);
    await channel.assertExchange(
      exchangeNameDLQ,
      exchangeType,
      exchangeOptions
    );

    const queue = await channel.assertQueue("", {
      exclusive: true,
      deadLetterExchange: exchangeNameDLQ,
      deadLetterRoutingKey: routingKeyDLQ,
    });
    await channel.bindQueue(queue.queue, exchangeName, routingKey);

    await channel.consume(queue.queue, consumer, { noAck: false });

    //const queueDLQ = await channel.assertQueue("", { exclusive: false });
    //await channel.bindQueue(queueDLQ.queue, exchangeNameDLQ, routingKeyDLQ);
  }

  async sendError(appointment: Appoinment): Promise<AppoinmentResult> {
    const channel = RabbitMQBootstrap.channel;
    const exchangeName = Parameter.EXCHANGE_NAME_ERROR;
    const exchangeType = Parameter.EXCHANGE_TYPE;
    const exchangeOptions = { durable: true };
    const routingKey = "";

    await channel.assertExchange(exchangeName, exchangeType, exchangeOptions);
    channel.publish(
      exchangeName,
      routingKey,
      Buffer.from(JSON.stringify(appointment))
    );

    return Promise.resolve(ok(appointment));
  }
}

const amqp = require("amqplib");

(async () => {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  const exchangeDQLName = "exchange-dlq";
  await channel.assertExchange(exchangeDQLName, "direct", { durable: true });
  const routingKey = "";

  const queueNameDLQ = "queueDLQ";
  await channel.assertQueue(queueNameDLQ);

  await channel.bindQueue(queueNameDLQ, exchangeDQLName, routingKey);

  channel.consume(
    queueNameDLQ,
    (message) => {
      console.log("message DLQ", message.content.toString());
      channel.ack(message);
    },
    {
      noAck: false,
    }
  );
})();

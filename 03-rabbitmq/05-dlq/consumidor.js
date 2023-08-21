const amqp = require("amqplib");
const args = process.argv.slice(2);

(async () => {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  const exchangeName = "exchange-direct";
  await channel.assertExchange(exchangeName, "direct", { durable: true });

  const exchangeDLQName = "exchange-dlq";
  await channel.assertExchange(exchangeDLQName, "direct", { durable: true });

  const assertQueue = await channel.assertQueue("", {
    exclusive: true,
    deadLetterExchange: exchangeDLQName,
    deadLetterRoutingKey: "",
  });

  const routingKey = args.length > 0 ? args[0] : "key";
  await channel.bindQueue(assertQueue.queue, exchangeName, routingKey);

  channel.consume(
    assertQueue.queue,
    (message) => {
      console.log("message", message.content.toString());
      channel.reject(message, false);
    },
    {
      noAck: false,
    }
  );
})();

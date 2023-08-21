const amqp = require("amqplib");
const args = process.argv.slice(2);

(async () => {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  const queueName = "queue01";
  await channel.assertQueue(queueName, { durable: true });

  const message = args.length > 0 ? args[0] : "message by default";

  for (let i = 0; i <= 9; i++) {
    channel.sendToQueue(queueName, Buffer.from(`${message} -  ${i}`));
  }

  setTimeout(() => {
    connection.close();
    process.exit(1);
  }, 2000);
})();

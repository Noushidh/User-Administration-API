import { Channel } from "amqplib";

export async function setupRabbitmq(channel: Channel) {
  await channel.assertExchange("user.events", "direct", {
    durable: true,
  });
  await channel.assertQueue("postgres.user.sync", {
    durable: true,
  });
  await channel.bindQueue("postgres.user.sync", "user.events", "user.created");
  console.log("RabbitMQ setup completed");
}


import amqp from "amqplib"

export async function connectRabbitMQ() {
  const connection = await amqp.connect(
    "amqp://guest:guest@localhost:5672"
  );

  const channel = await connection.createChannel();

  console.log("RabbitMQ connected");

  return { connection, channel };
}
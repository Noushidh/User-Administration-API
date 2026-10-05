import dotenv from "dotenv";
dotenv.config();

import { connectRabbitMQ } from "./infrastructure/rabbitmq/rabbitmq.connection";
import { createWorkerContainer } from "./infrastructure/container/worker.container";

async function startWorker() {
  try {
    const { channel } = await connectRabbitMQ();

    const container = createWorkerContainer(channel);

    await container.userConsumer.start();

    console.log("Worker started");
  } catch (error) {
    console.error("Worker failed:", error);
  }
}

startWorker();
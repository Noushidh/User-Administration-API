import dotenv from "dotenv";
dotenv.config();

import { createApp } from "./app";

import { connectRabbitMQ } from "./infrastructure/rabbitmq/rabbitmq.connection";
import { setupRabbitmq } from "./infrastructure/rabbitmq/rabbitmq.setup";
import { connectMongoDB } from "./infrastructure/database/mongodb/connection";
import { connectPostgres } from "./infrastructure/database/postgresql/connection";

import { createContainer } from "./infrastructure/container/container";

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    const { channel } = await connectRabbitMQ();

    await connectMongoDB();
    await connectPostgres();

    await setupRabbitmq(channel);

    const container = createContainer(channel);

    const app = createApp(container);

    app.listen(PORT, () => {
      console.log(
        `server running on http://localhost:${PORT}`
      );
    });

  } catch (err) {
    console.error("Failed to start server:", err);
  }
}

start();
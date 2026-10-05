import { Channel } from "amqplib";
import { PostgresUserRepository } from "../database/postgresql/postgres-user.repository";

export class UserConsumer {
  constructor(
    private readonly channel: Channel,
    private readonly postgresUserRepository: PostgresUserRepository,
  ) {}
  async start() {
    await this.channel.consume("postgres.user.sync", async (message) => {
      if (!message) return;
      try {
        const data = JSON.parse(message.content.toString());

        console.log("receive message", data);

        const user = data.user;

        await this.postgresUserRepository.create(user);

        this.channel.ack(message);

      } catch (error) {
        console.error("Errro processing message", error);
        this.channel.nack(message,false,true)
      }
      console.log(message.content.toString());
    });
  }
}

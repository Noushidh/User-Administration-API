import { Channel } from "amqplib";
import { User } from "../../domain/entities/User";

export class UserProducer {
  constructor(private readonly channel: Channel) {}

 async publishUserCreated(user: User):Promise<void> {
    const message = {
      event: "user.created",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        createdAt: user.createdAt,
      },
    };

    this.channel.publish(
      "user.events",
      "user.created",
      Buffer.from(JSON.stringify(message))
    );

    console.log("UserCreated event published");
  }
}
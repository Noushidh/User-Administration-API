import { User } from "../../domain/entities/User";

export interface IUserEventPublisher {
  publishUserCreated(user: User): Promise<void>;
}
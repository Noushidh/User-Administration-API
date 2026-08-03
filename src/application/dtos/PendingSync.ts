import { User } from "../../domain/entities/User";

export interface PendingSync {
  id: string;
  user: User;
}
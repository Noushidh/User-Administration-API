import { User } from "../../domain/entities/User";
import { PendingSync } from "../dtos/PendingSync";

export interface ISyncRepository {
    saveFailedSync(user: User): Promise<void>;
    getPending(): Promise<PendingSync[]>;
    markCompleted(id: string): Promise<void>;
}
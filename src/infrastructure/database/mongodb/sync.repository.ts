import { PendingSync } from "../../../application/dtos/PendingSync";
import { ISyncRepository } from "../../../application/interface/ISyncRepository";
import { User } from "../../../domain/entities/User";
import { SyncModel } from "./models/sync.model";

export class SyncRepository implements ISyncRepository {
  async saveFailedSync(user: User): Promise<void> {
    await SyncModel.create({
        user,
        status:"PENDING",
    })
  }

async getPending(): Promise<PendingSync[]> {
  const records = await SyncModel.find({
    status: "PENDING",
  });

  return records.map((record) => ({
    id: record._id.toString(),
    user: record.user as User,
  }));
}
  async markCompleted(id: string): Promise<void> {
    await SyncModel.findByIdAndUpdate(id,{status:"COMPLETED"})
  }
}
import { SyncRepository } from "../database/mongodb/sync.repository";
import { PostgresUserRepository } from "../database/postgresql/postgres-user.repository";

const syncRepository = new SyncRepository();
const postgresRepository = new PostgresUserRepository();

setInterval(async () => {
  const pending = await syncRepository.getPending();

  for (const record of pending) {
    try {
      await postgresRepository.create(record.user);
      await syncRepository.markCompleted(record.id);
    } catch (error) {
      console.log("Postgres still unavailable");
    }
  }
}, 30000);
import { CreateUserUseCase } from "../../application/use-cases/create-user-usecase";
import { MongoUserRepository } from "../database/mongodb/mongo-user.repository";
import { SyncRepository } from "../database/mongodb/sync.repository";
import { PostgresUserRepository } from "../database/postgresql/postgres-user.repository";
import { BcryptHashService } from "../services/BcryptHashService";
import { JwtService } from "../services/JwtService";

export function makeCreateUserUserCase() {
  const mongoRepository = new MongoUserRepository();
  const postgresRepository = new PostgresUserRepository();
  const syncRepository = new SyncRepository();
  const hashService = new BcryptHashService();
  const jwtService = new JwtService()

  return new CreateUserUseCase(
    mongoRepository,
    postgresRepository,
    syncRepository,
    hashService,
    jwtService
  );
}
import { CreateUserUseCase } from "../../application/use-cases/create-user-usecase";
import { LoginUserUseCase } from "../../application/use-cases/login-user-usecase";

import { MongoUserRepository } from "../database/mongodb/mongo-user.repository";
import { PostgresUserRepository } from "../database/postgresql/postgres-user.repository";
import { SyncRepository } from "../database/mongodb/sync.repository";

import { BcryptHashService } from "../services/BcryptHashService";
import { JwtService } from "../services/JwtService";


const userRepository = new MongoUserRepository();

const postgresRepository = new PostgresUserRepository();

const syncRepository = new SyncRepository();


const hashService = new BcryptHashService();

const jwtService = new JwtService();


export const createUserUseCase = new CreateUserUseCase(
  userRepository,
  postgresRepository,
  syncRepository,
  hashService,
  jwtService,
);

export const loginUserUseCase = new LoginUserUseCase(
  userRepository,
  hashService,
  jwtService,
);
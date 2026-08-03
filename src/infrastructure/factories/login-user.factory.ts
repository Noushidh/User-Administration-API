import { LoginUserUseCase } from "../../application/use-cases/login-user-usecase";
import { MongoUserRepository } from "../database/mongodb/mongo-user.repository";
import { BcryptHashService } from "../services/BcryptHashService";
import { JwtService } from "../services/JwtService";

export function makeLoginUserUseCase() {
  const userRepository = new MongoUserRepository();
  const hashService = new BcryptHashService();
  const jwtService = new JwtService();

  return new LoginUserUseCase(
    userRepository,
    hashService,
    jwtService
  );
}
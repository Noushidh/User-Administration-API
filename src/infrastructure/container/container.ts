import { Channel } from "amqplib";
import { CreateUserUseCase } from "../../application/use-cases/create-user-usecase";
import { LoginUserUseCase } from "../../application/use-cases/login-user-usecase";

import { MongoUserRepository } from "../database/mongodb/mongo-user.repository";

import { BcryptHashService } from "../services/BcryptHashService";
import { JwtService } from "../services/JwtService";

import { AuthController } from "../../presentation/controllers/user/login.controller";
import { RegisterController } from "../../presentation/controllers/user/user.controller";
import { LogoutController } from "../../presentation/controllers/user/logout.controller";

import { UserProducer } from "../rabbitmq/user.producer";

export function createContainer(channel: Channel) {

  const userRepository = new MongoUserRepository();

  const hashService = new BcryptHashService();

  const jwtService = new JwtService();

  const userProducer = new UserProducer(channel);

  const createUserUseCase = new CreateUserUseCase(
    userRepository,
    userProducer,
    hashService,
    jwtService,
  );

  const loginUserUseCase = new LoginUserUseCase(
    userRepository,
    hashService,
    jwtService,
  );

  const registerController =
    new RegisterController(createUserUseCase);

  const authController =
    new AuthController(loginUserUseCase);

  const logoutController =
    new LogoutController();

  return {
    registerController,
    authController,
    logoutController,
  };
}
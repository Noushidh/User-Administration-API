import { CreateUserUseCase } from "../../application/use-cases/create-user-usecase";
import { MongoUserRepository } from "../database/mongodb/mongo-user.repository";

export function makeCreateUserUserCase(){
    const repository = new MongoUserRepository()
    return new CreateUserUseCase(repository);
}
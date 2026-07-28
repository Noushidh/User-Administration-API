import { CreateUserDTO } from "../dtos/CreateUserDTO";

export class CreateUserUseCase {
  async execute(data: CreateUserDTO) {
    if (!data.name) {
      throw new Error("Name is required");
    }
    if (!data.email) {
      throw new Error("Email is required");
    }
    if (!data.password) {
      throw new Error("Password is required");
    }
  }
}

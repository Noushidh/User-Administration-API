import { CreateUserDTO } from "../dtos/CreateUserDTO";
import { User } from "../../domain/entities/User";
import { IUserRepository } from "../interface/IUserRepository";
import { UserResponseDTO } from "../dtos/UserResponseDTO";

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}
  async execute(data: CreateUserDTO): Promise<UserResponseDTO> {
    if (!data.name) {
      throw new Error("Name is required");
    }
    if (!data.email) {
      throw new Error("Email is required");
    }
    if (!data.password) {
      throw new Error("Password is required");
    }
    const existing = await this.userRepository.findByEmail(data.email);
    if (existing) {
      throw new Error("Email exists");
    }
    const user = new User(
      crypto.randomUUID(),
      data.name,
      data.email,
      data.password,
      new Date(),
    );
    await this.userRepository.create(user);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };
  }
}

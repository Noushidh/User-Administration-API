import { CreateUserDTO } from "../dtos/CreateUserDTO";
import { User } from "../../domain/entities/User";
import { IUserRepository } from "../interface/IUserRepository";
import { UserResponseDTO } from "../dtos/UserResponseDTO";
import { ISyncRepository } from "../interface/ISyncRepository";
import { IHashService } from "../interface/IHashService";
import { IJwtService } from "../interface/IJwtService";

export class CreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private postgresRepository: IUserRepository,
    private syncRepository: ISyncRepository,
    private hashService: IHashService,
    private jwtService: IJwtService,
  ) {}
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

    const hashedPassword = await this.hashService.hash(data.password);

    const user = new User(
      crypto.randomUUID(),
      data.name,
      data.email,
      hashedPassword,
      new Date(),
    );
    const createdUser = await this.userRepository.create(user);

    const token = this.jwtService.generateToken({
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
    });

    try {
      await this.postgresRepository.create(createdUser);
    } catch (err) {
      console.error("Postgres Error:", err);
      await this.syncRepository.saveFailedSync(createdUser);
    }
    return {
      user: {
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
        createdAt: createdUser.createdAt,
      },
      token,
    };
  }
}

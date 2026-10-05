import { CreateUserDTO } from "../dtos/CreateUserDTO";
import { User } from "../../domain/entities/User";
import { IUserRepository } from "../interface/IUserRepository";
import { IUserEventPublisher } from "../interface/IUserEventPublisher";
import { UserResponseDTO } from "../dtos/UserResponseDTO";
import { IHashService } from "../interface/IHashService";
import { IJwtService } from "../interface/IJwtService";

export class CreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private eventPublisher: IUserEventPublisher,
    private hashService: IHashService,
    private jwtService: IJwtService,
  ) {}
  async execute(data: CreateUserDTO): Promise<UserResponseDTO> {
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
    await this.eventPublisher.publishUserCreated(createdUser)

    const token = this.jwtService.generateToken({
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
    });

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

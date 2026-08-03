import { LoginUserDTO } from "../dtos/LoginUserDTO";
import { LoginResponseDTO } from "../dtos/LoginResponseDTO";
import { IHashService } from "../interface/IHashService";
import { IJwtService } from "../interface/IJwtService";
import { IUserRepository } from "../interface/IUserRepository";

export class LoginUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private hashService: IHashService,
    private jwtService: IJwtService
  ) {}

  async execute(data: LoginUserDTO): Promise<LoginResponseDTO> {
    if (!data.email) {
      throw new Error("Email is required");
    }

    if (!data.password) {
      throw new Error("Password is required");
    }

    const user = await this.userRepository.findByEmail(data.email);

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await this.hashService.compare(
      data.password,
      user.password
    );

    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    const token = this.jwtService.generateToken({
      id: user.id,
      name: user.name,
      email: user.email,
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
      token,
    };
  }
}
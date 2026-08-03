import jwt from "jsonwebtoken";
import { IJwtService } from "../../application/interface/IJwtService";

export class JwtService implements IJwtService {
  generateToken(payload: {
    id: string;
    name: string;
    email: string;
  }): string {

    return jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });
  }
}
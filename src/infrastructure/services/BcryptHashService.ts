import bcrypt from "bcrypt";
import { IHashService } from "../../application/interface/IHashService";

export class BcryptHashService implements IHashService {
  async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
    async compare(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
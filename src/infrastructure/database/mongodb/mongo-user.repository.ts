import { IUserRepository } from "../../../application/interface/IUserRepository";
import { User } from "../../../domain/entities/User";
import { UserModel } from "./models/user.model";

export class MongoUserRepository implements IUserRepository{
    async create(user:User):Promise<User>{
        const created = await UserModel.create(user);
        return created;
    }
    async findByEmail(email: string): Promise<User | null> {
        return await UserModel.findOne({email})
    }
}
import { IUser, User } from "../../models/user";
import { BaseRepository } from "../baseRepository";

export class UserRepository implements BaseRepository<IUser> {
  async create(user: IUser): Promise<IUser> {
    return User.create(user);
  }

  async findById(id: string): Promise<IUser | null> {
    return User.findById(id);
  }

  async findAll(): Promise<IUser[]> {
    return User.find();
  }

  async update(id: string, userData: Partial<IUser>): Promise<IUser | null> {
    return User.findByIdAndUpdate(id, userData, { new: true });
  }

  async delete(id: string): Promise<IUser | null> {
    return User.findByIdAndDelete(id);
  }
}

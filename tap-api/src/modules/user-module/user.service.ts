import User, { IUser } from "../../shared/types/models/user.schema";
import { Types } from "mongoose";

export class UserService {
    public async getUserById(userId: Types.ObjectId): Promise<IUser | null> {
        return User.findById(userId).select("-password"); // Exclude password from the result
    }

    public async getUserByEmail(email: string): Promise<IUser | null> {
        return User.findOne({ email }).select("-password"); // Exclude password
    }

    public async updateUser(
        userId: Types.ObjectId,
        updates: Partial<IUser>
    ): Promise<IUser | null> {
        return User.findByIdAndUpdate(userId, updates, { new: true }).select(
            "-password"
        );
    }
}

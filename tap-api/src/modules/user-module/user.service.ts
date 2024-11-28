import { IUserService } from "./interfaces/iuser.service";
import User, {
    IUser,
    SemesterPlan,
    FavoriteSchedule,
} from "../../shared/types/models/user.schema";
import { Types } from "mongoose";

export class UserService implements IUserService {
    public async createUser(userData: Partial<IUser>): Promise<IUser> {
        const newUser = new User(userData);
        return newUser.save();
    }

    public async getUserByEmail(email: string): Promise<IUser | null> {
        return User.findOne({ email }).select("+password");
    }

    public async getUserById(userId: Types.ObjectId): Promise<IUser | null> {
        return User.findById(userId).select("-password");
    }

    public async updateUserById(
        userId: Types.ObjectId,
        updates: Partial<IUser>
    ): Promise<IUser | null> {
        return User.findByIdAndUpdate(userId, updates, { new: true }).select(
            "-password"
        );
    }

    public async getDegreePlanById(
        userId: Types.ObjectId
    ): Promise<SemesterPlan[] | null> {
        const user = await User.findById(userId);
        return user ? user.degreePlan : null;
    }

    public async addFavoriteDegreePlan(
        userId: Types.ObjectId,
        favoriteData: FavoriteSchedule
    ): Promise<boolean> {
        const user = await User.findById(userId);
        if (!user) return false;

        const isAlreadyFavorited = user.favorites.some(
            (fav) => fav.name === favoriteData.name
        );
        if (isAlreadyFavorited) return false;

        user.favorites.push(favoriteData);
        await user.save();
        return true;
    }

    public async removeFavoriteDegreePlan(
        userId: Types.ObjectId,
        favoriteName: string
    ): Promise<boolean> {
        const user = await User.findById(userId);
        if (!user) return false;

        const originalLength = user.favorites.length;
        user.favorites = user.favorites.filter(
            (fav) => fav.name !== favoriteName
        );

        if (user.favorites.length === originalLength) return false;

        await user.save();
        return true;
    }

    public async getFavoriteDegreePlansById(
        userId: Types.ObjectId
    ): Promise<FavoriteSchedule[] | null> {
        const user = await User.findById(userId);
        return user ? user.favorites : null;
    }
}

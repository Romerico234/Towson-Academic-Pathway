import User, {
    IUser,
    SemesterPlan,
    FavoriteSchedule,
} from "../../shared/types/models/user.schema";
import { Types } from "mongoose";

export class UserService {
    public async createUser(userData: Partial<IUser>): Promise<IUser> {
        const newUser = new User(userData);
        return newUser.save();
    }

    public async getUserById(userId: Types.ObjectId): Promise<IUser | null> {
        return User.findById(userId).select("-password");
    }

    public async getUserByEmail(email: string): Promise<IUser | null> {
        return User.findOne({ email }).select("-password");
    }

    public async updateUserById(
        userId: Types.ObjectId,
        updates: Partial<IUser>
    ): Promise<IUser | null> {
        return User.findByIdAndUpdate(userId, updates, { new: true }).select(
            "-password"
        );
    }

    public async updateUserByEmail(
        email: string,
        updates: Partial<IUser>
    ): Promise<IUser | null> {
        return User.findOneAndUpdate({ email }, updates, { new: true }).select(
            "-password"
        );
    }

    public async getDegreePlanByEmail(
        email: string
    ): Promise<SemesterPlan[] | null> {
        const studentData = await User.findOne({ email });
        return studentData ? studentData.degreePlan : null;
    }

    public async addFavoriteDegreePlan(
        email: string,
        favoriteData: FavoriteSchedule
    ): Promise<boolean> {
        const studentData = await User.findOne({ email });
        if (!studentData) return false;

        const isAlreadyFavorited = studentData.favorites.some(
            (fav) => fav.name === favoriteData.name
        );
        if (isAlreadyFavorited) return false;

        studentData.favorites.push(favoriteData);
        await studentData.save();
        return true;
    }

    public async removeFavoriteDegreePlan(
        email: string,
        favoriteName: string
    ): Promise<boolean> {
        const studentData = await User.findOne({ email });
        if (!studentData) return false;

        const originalLength = studentData.favorites.length;
        studentData.favorites = studentData.favorites.filter(
            (fav) => fav.name !== favoriteName
        );

        if (studentData.favorites.length === originalLength) return false;

        await studentData.save();
        return true;
    }

    public async getFavoriteDegreePlansByEmail(
        email: string
    ): Promise<FavoriteSchedule[] | null> {
        const studentData = await User.findOne({ email });
        return studentData ? studentData.favorites : null;
    }
}

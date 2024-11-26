import { IStudentService } from "./interfaces/istudent.service";
import StudentData, {
    IStudentData,
    FavoriteSchedule,
} from "../../shared/types/models/student.schema";
import { Types } from "mongoose";

export class StudentService implements IStudentService {
    public async createStudentData(
        userId: Types.ObjectId,
        email: string,
        firstName: string,
        lastName: string
    ): Promise<IStudentData> {
        const studentData = new StudentData({
            userId,
            email,
            firstName,
            lastName,
            academicInfo: {},
            preferences: {},
            degreePlans: [],
            favorites: [],
        });

        const savedStudentData = await studentData.save();
        return savedStudentData;
    }

    public async getStudentByEmail(
        email: string
    ): Promise<IStudentData | null> {
        return StudentData.findOne({ email });
    }

    public async updateStudentByEmail(
        email: string,
        updates: Partial<IStudentData>
    ): Promise<IStudentData | null> {
        return StudentData.findOneAndUpdate({ email }, updates, { new: true });
    }

    public async getFavoritesByEmail(
        email: string
    ): Promise<FavoriteSchedule[] | null> {
        const studentData = await StudentData.findOne({ email });
        return studentData ? studentData.favorites : null;
    }

    public async addFavoriteByEmail(
        email: string,
        favoriteData: FavoriteSchedule
    ): Promise<FavoriteSchedule | null> {
        const studentData = await StudentData.findOne({ email });
        if (!studentData) return null;

        studentData.favorites.push(favoriteData);
        await studentData.save();
        return favoriteData;
    }

    public async removeFavoriteByEmail(
        email: string,
        favoriteName: string
    ): Promise<boolean> {
        const studentData = await StudentData.findOne({ email });
        if (!studentData) return false;

        const originalLength = studentData.favorites.length;
        studentData.favorites = studentData.favorites.filter(
            (fav) => fav.name !== favoriteName
        );

        if (studentData.favorites.length === originalLength) {
            // Favorite not found
            return false;
        }

        await studentData.save();
        return true;
    }
}

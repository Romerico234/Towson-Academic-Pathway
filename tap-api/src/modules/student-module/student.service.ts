import StudentData, {
    IStudentData,
    FavoriteSchedule,
} from "../../types/models/student.schema";
import { Types } from "mongoose";

export class StudentService {
    // Create new student data
    public async createStudentData(
        userId: Types.ObjectId,
        firstName: string,
        lastName: string
    ): Promise<IStudentData> {
        const studentData = new StudentData({
            userId,
            studentId: null,
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

    // Get student data by userId
    public async getStudentData(
        userId: Types.ObjectId
    ): Promise<IStudentData | null> {
        return StudentData.findOne({ userId });
    }

    // Update student data
    public async updateStudentData(
        userId: Types.ObjectId,
        updates: Partial<IStudentData>
    ): Promise<IStudentData | null> {
        return StudentData.findOneAndUpdate({ userId }, updates, { new: true });
    }

    // Get favorites
    public async getFavorites(
        userId: Types.ObjectId
    ): Promise<FavoriteSchedule[] | null> {
        const studentData = await StudentData.findOne({ userId });
        return studentData ? studentData.favorites : null;
    }

    // Add a favorite schedule
    public async addFavorite(
        userId: Types.ObjectId,
        favoriteData: FavoriteSchedule
    ): Promise<FavoriteSchedule | null> {
        const studentData = await StudentData.findOne({ userId });
        if (!studentData) return null;

        studentData.favorites.push(favoriteData);
        await studentData.save();
        return favoriteData;
    }

    // Remove a favorite schedule
    public async removeFavorite(
        userId: Types.ObjectId,
        favoriteName: string
    ): Promise<void> {
        const studentData = await StudentData.findOne({ userId });
        if (studentData) {
            studentData.favorites = studentData.favorites.filter(
                (fav) => fav.name !== favoriteName
            );
            await studentData.save();
        }
    }
}

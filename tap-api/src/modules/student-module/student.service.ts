import StudentData, {
    IStudentData,
    FavoriteSchedule,
} from "../../types/models/student.schema";
import { Types } from "mongoose";

export class StudentService {
    // Create new student data
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

    // Get student data by email
    public async getStudentByEmail(
        email: string
    ): Promise<IStudentData | null> {
        return StudentData.findOne({ email });
    }

    // Update student data by email
    public async updateStudentByEmail(
        email: string,
        updates: Partial<IStudentData>
    ): Promise<IStudentData | null> {
        return StudentData.findOneAndUpdate({ email }, updates, { new: true });
    }

    // Get favorites by email
    public async getFavoritesByEmail(
        email: string
    ): Promise<FavoriteSchedule[] | null> {
        const studentData = await StudentData.findOne({ email });
        return studentData ? studentData.favorites : null;
    }

    // Add a favorite schedule by email
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

    // Remove a favorite schedule by email
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

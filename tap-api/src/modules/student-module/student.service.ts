import StudentData, {
    IStudentData,
    FavoriteSchedule,
} from "../../types/models/student.schema";

export class StudentService {
    // Create new student data
    public async createStudentData(
        studentId: string,
        firstName: string,
        lastName: string
    ): Promise<IStudentData> {
        const studentData = new StudentData({
            studentId,
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

    // Get student data by studentId
    public async getStudentData(
        studentId: string
    ): Promise<IStudentData | null> {
        return StudentData.findOne({ studentId });
    }

    // Update student data
    public async updateStudentData(
        studentId: string,
        updates: Partial<IStudentData>
    ): Promise<IStudentData | null> {
        return StudentData.findOneAndUpdate({ studentId }, updates, { new: true });
    }

    // Get favorites
    public async getFavorites(
        studentId: string
    ): Promise<FavoriteSchedule[] | null> {
        const studentData = await StudentData.findOne({ studentId });
        return studentData ? studentData.favorites : null;
    }

    // Add a favorite schedule
    public async addFavorite(
        studentId: string,
        favoriteData: FavoriteSchedule
    ): Promise<FavoriteSchedule | null> {
        const studentData = await StudentData.findOne({ studentId });
        if (!studentData) return null;

        studentData.favorites.push(favoriteData);
        await studentData.save();
        return favoriteData;
    }

    // Remove a favorite schedule
    public async removeFavorite(
        studentId: string,
        favoriteName: string
    ): Promise<void> {
        const studentData = await StudentData.findOne({ studentId });
        if (studentData) {
            studentData.favorites = studentData.favorites.filter(
                (fav) => fav.name !== favoriteName
            );
            await studentData.save();
        }
    }
}

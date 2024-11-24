import Major, { IMajor } from "../types/models/major.schema";

class MajorService {
    // Get all majors
    async getAllMajors(): Promise<IMajor[]> {
        return Major.find({});
    }

    // Get major by name
    async getMajorByName(name: string): Promise<IMajor | null> {
        return Major.findOne({ name: new RegExp(`^${name}$`, "i") }); // Case-insensitive exact match
    }

    // Search majors by name
    async searchMajors(query: string): Promise<IMajor[]> {
        const regex = new RegExp(query, "i"); // Case-insensitive search
        return Major.find({ name: regex });
    }
}

export default new MajorService();

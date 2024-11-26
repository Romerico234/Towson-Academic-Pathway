import { IMajorService } from "./interfaces/imajor.service";
import Major, { IMajor } from "../../shared/types/models/major.schema";

export class MajorService implements IMajorService {
    async getAllMajors(): Promise<IMajor[]> {
        return Major.find({});
    }

    async getMajorByName(name: string): Promise<IMajor | null> {
        return Major.findOne({ name: new RegExp(`^${name}$`, "i") }); // Case-insensitive exact match
    }

    async searchMajors(query: string): Promise<IMajor[]> {
        const regex = new RegExp(query, "i"); // Case-insensitive search
        return Major.find({ name: regex });
    }
}

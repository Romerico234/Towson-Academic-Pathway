import Core, { ICore } from "../../types/models/core.schema";

class CoreService {
    // Get all cores
    async getAllCores(): Promise<ICore[]> {
        return Core.find({});
    }

    // Search cores by name or code
    async searchCores(query: string): Promise<ICore[]> {
        const regex = new RegExp(query, "i"); // Case-insensitive search
        return Core.find({
            $or: [{ name: regex }, { code: regex }],
        });
    }
}

export default new CoreService();

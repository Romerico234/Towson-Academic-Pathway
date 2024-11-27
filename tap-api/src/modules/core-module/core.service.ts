import { ICoreService } from "./interfaces/icore.service";
import Core, { ICore } from "../../shared/types/models/core.schema";

export class CoreService implements ICoreService {
    async getAllCores(): Promise<ICore[]> {
        return Core.find({});
    }

    async searchCores(query: string): Promise<ICore[]> {
        const regex = new RegExp(query, "i"); // Case-insensitive search
        return Core.find({
            $or: [{ name: regex }, { code: regex }],
        });
    }
}

import { ICoreService } from "./interfaces/icore.service";
import Core, { ICore } from "../../shared/types/models/core.schema";

export class CoreService implements ICoreService {
    async getAllCores(): Promise<ICore[]> {
        return Core.find({});
    }
}

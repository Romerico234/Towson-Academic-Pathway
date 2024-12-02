import { ICoreService } from "./interfaces/icore.service";
import Core, { ICore } from "../../shared/types/models/core.schema";

export class CoreService implements ICoreService {
    async getAllCores(): Promise<ICore[]> {
        return Core.find({});
    }

    async getFormattedCores(): Promise<any[]> {
        const cores = await Core.find({});
        return cores.map((core) => {
            return {
                name: core.name,
                code: core.code,
                description: core.description,
                units: core.units,
                courses: core.courses,
                learningOutcomes: core.learningOutcomes,
            };
        });
    }
}

import { IRequirementsService } from "./interfaces/irequirements.service";
import Requirement from "../../shared/types/models/requirements.schema";

export class RequirementsService implements IRequirementsService {
    async getRequirements(): Promise<any> {
        return Requirement.findOne({});
    }
}

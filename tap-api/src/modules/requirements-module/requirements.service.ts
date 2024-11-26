import Requirement from "../../shared/types/models/requirements.schema";

export class RequirementsService {
    // Get requirements
    async getRequirements(): Promise<any> {
        return Requirement.findOne({});
    }
}

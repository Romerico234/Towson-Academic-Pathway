import Requirement from "../../types/models/requirements.schema";

export class RequirementsService {
    // Get requirements
    async getRequirements(): Promise<any> {
        return Requirement.findOne({});
    }
}

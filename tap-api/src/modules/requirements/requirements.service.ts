import Requirement from "../../types/models/requirements.schema";

class RequirementsService {
    // Get requirements
    async getRequirements(): Promise<any> {
        return Requirement.findOne({});
    }
}

export default new RequirementsService();

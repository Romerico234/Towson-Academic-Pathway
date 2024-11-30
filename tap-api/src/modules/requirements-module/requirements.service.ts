import { IRequirementsService } from "./interfaces/irequirements.service";
import Requirement from "../../shared/types/models/requirements.schema";

export class RequirementsService implements IRequirementsService {
    async getDegreeRequirements(): Promise<any> {
        const requirement = await Requirement.findOne({
            degreeRequirements: { $exists: true },
        });
        return requirement?.degreeRequirements || null;
    }

    async getHonorsRequirements(): Promise<any> {
        const requirement = await Requirement.findOne({
            honorsRequirements: { $exists: true },
        });
        return requirement?.honorsRequirements || null;
    }

    async getDegreeRequirementByType(type: string): Promise<any> {
        const requirement = await Requirement.findOne({
            degreeRequirements: { $exists: true },
        });
        const degreeTypes = requirement?.degreeRequirements?.degreeTypes;
        if (degreeTypes) {
            return (
                degreeTypes.find(
                    (degreeType: any) => degreeType.type === type
                ) || null
            );
        }
        return null;
    }
}

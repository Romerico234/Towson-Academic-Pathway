import { IMajorService } from "./interfaces/imajor.service";
import Major, { IMajor } from "../../shared/types/models/major.schema";

export class MajorService implements IMajorService {
    async getAllMajors(): Promise<IMajor[]> {
        return Major.find({});
    }

    async getMajorByName(name: string): Promise<IMajor | null> {
        return Major.findOne({ name: new RegExp(`^${name}$`, "i") }) // Case-insensitive search
            .select("-_id");
    }

    async getMajorByNameWithNoConcentration(name: string): Promise<any | null> {
        return Major.findOne({ name: new RegExp(`^${name}$`, "i") })
            .select("-_id -concentrations")
            .lean()
            .then((major) => {
                return major;
            });
    }

    async getAllConcentrationsForAMajor(
        majorName: string
    ): Promise<any | null> {
        const major = await Major.findOne({
            name: new RegExp(`^${majorName}$`, "i"),
        }).lean();

        if (major && major.concentrations) {
            return major.concentrations;
        }
        return null;
    }

    async getConcentrationByMajorAndName(
        majorName: string,
        concentrationName: string
    ): Promise<any | null> {
        const major = await Major.findOne({
            name: new RegExp(`^${majorName}$`, "i"),
        }).lean();

        if (major && major.concentrations) {
            const concentration = major.concentrations.find(
                (concentration) =>
                    concentration.name.toLowerCase() ===
                    concentrationName.toLowerCase()
            );
            return concentration || null;
        }

        return null;
    }
}

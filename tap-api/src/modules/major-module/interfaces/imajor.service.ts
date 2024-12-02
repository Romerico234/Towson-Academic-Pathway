import { IMajor } from "../../../shared/types/models/major.schema";

export interface IMajorService {
    /**
     * Retrieves all majors
     * @returns A Promise that resolves to an array of IMajor
     */
    getAllMajors(): Promise<IMajor[]>;

    /**
     * Retrieves a major by its name
     * @param name - The name of the major
     * @returns A Promise that resolves to an IMajor or null if not found
     */
    getMajorByName(name: string): Promise<IMajor | null>;
}

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

    /**
     * Retrieves a major by its name without its concentrations
     * @param name - The name of the major
     * @returns A Promise that resolves to an IMajor or null if not found
     */
    getMajorByNameWithNoConcentration(name: string): Promise<any | null>;

    /**
     * Retrieves all concentrations for a major
     * @param majorName - The name of the major
     * @returns A Promise that resolves to an array of concentrations or null if not found
     */
    getAllConcentrationsForAMajor(majorName: string): Promise<any | null>;

    /**
     * Retrieves a concentration by its major and concentration name
     * @param majorName - The name of the major
     * @param concentrationName - The name of the concentration
     * @returns A Promise that resolves to a concentration or null if not found
     */
    getConcentrationByMajorAndName(
        majorName: string,
        concentrationName: string
    ): Promise<any | null>;
}

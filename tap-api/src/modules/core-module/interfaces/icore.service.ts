import { ICore } from "../../../shared/types/models/core.schema";

export interface ICoreService {
    /**
     * Retrieves all core requirements
     * @returns A Promise that resolves to an array of ICore
     */
    getAllCores(): Promise<ICore[]>;

    /**
     * Retrieves all core requirements in a formatted manner
     * @returns A Promise that resolves to an array of objects
     */
    getFormattedCores(): Promise<any[]>;
}

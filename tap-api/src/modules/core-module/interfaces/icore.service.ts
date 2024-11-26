import { ICore } from "../../../shared/types/models/core.schema";

export interface ICoreService {
    /**
     * Retrieves all core requirements
     * @returns A Promise that resolves to an array of ICore
     */
    getAllCores(): Promise<ICore[]>;

    /**
     * Searches for core requirements based on a query string
     * @param query - The query string to search for
     * @returns A Promise that resolves to an array of ICor
     */
    searchCores(query: string): Promise<ICore[]>;
}

export interface IRequirementsService {
    /**
     * Retrieves the academic requirements
     * @returns A Promise that resolves to the requirements data
     */
    getRequirements(): Promise<any>;
}

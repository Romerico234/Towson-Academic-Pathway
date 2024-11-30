export interface IRequirementsService {
    /**
     * Retrieves the degree requirements
     */
    getDegreeRequirements(): Promise<any>;

    /**
     * Retrieves the honors requirements
     */
    getHonorsRequirements(): Promise<any>;

    /**
     * Retrieves a specific degree requirement by type
     * @param type - The degree type (e.g., "Bachelor of Science")
     */
    getDegreeRequirementByType(type: string): Promise<any>;
}

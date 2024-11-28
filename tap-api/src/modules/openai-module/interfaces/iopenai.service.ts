export interface IOpenAIService {
    /**
     * Generates academic plans using OpenAI based on the provided user data.
     * @param userData - The user's form data and preferences.
     * @returns A Promise that resolves to the generated plans.
     * @throws OpenAIError if the API call fails or the response cannot be parsed.
     */
    generatePlans(userData: any): Promise<any>;
}

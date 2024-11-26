export interface IOpenAIService {
    /**
     * Generates academic plans using OpenAI based on the provided user prompt
     * @param userPrompt - The prompt provided by the user
     * @returns A Promise that resolves to the generated plans
     * @throws OpenAIError if the API call fails or the response cannot be parsed
     */
    generatePlans(userPrompt: string): Promise<any>;
}

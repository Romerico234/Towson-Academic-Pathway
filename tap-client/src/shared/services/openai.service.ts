import api from "./api.service";

export default class OpenAIService {
    async generatePlan(userInput: Record<string, unknown>): Promise<any> {
        const response = await api.post("/openai/generate-plan", userInput);
        return response.data;
    }
}

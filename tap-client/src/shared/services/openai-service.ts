import api from "./api-service";

export const OpenAIService = {
    generatePlan: async (userInput: Record<string, unknown>) => {
        try {
            const response = await api.post("/openai/generate-plan", userInput);
            return response.data;
        } catch (error) {
            console.error("Error generating plan:", error);
            throw error;
        }
    },
};

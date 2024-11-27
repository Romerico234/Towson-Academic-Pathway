import api from "./api.service";
export default class OpenAIService {
    async generatePlan(formData: FormData): Promise<any> {
        const response = await api.post("/openai/generate-plan", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    }
}

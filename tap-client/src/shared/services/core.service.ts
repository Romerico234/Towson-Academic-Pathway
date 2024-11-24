import api from "./api.service";

export default class CoreService {
    async getAllCores(): Promise<any> {
        const response = await api.get("/cores");
        return response.data;
    }

    async searchCores(query: string): Promise<any> {
        const response = await api.get("/cores/search", {
            params: { query },
        });
        return response.data;
    }
}

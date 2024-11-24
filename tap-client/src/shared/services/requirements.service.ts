import api from "./api.service";

export default class RequirementsService {
    async getRequirements(): Promise<any> {
        const response = await api.get("/requirements");
        return response.data;
    }
}

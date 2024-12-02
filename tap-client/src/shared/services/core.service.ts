import api from "./api.service";

export default class CoreService {
    async getAllCores(): Promise<any> {
        const response = await api.get("/cores");
        return response.data;
    }
}

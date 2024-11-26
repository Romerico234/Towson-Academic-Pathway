import api from "./api.service";

export default class MajorService {
    async getAllMajors(): Promise<any> {
        const response = await api.get("/majors");
        return response.data;
    }

    async getMajorByName(name: string): Promise<any> {
        const response = await api.get(`/majors/${encodeURIComponent(name)}`);
        return response.data;
    }

    async searchMajors(query: string): Promise<any> {
        const response = await api.get("/majors/search", {
            params: { query },
        });
        return response.data;
    }
}

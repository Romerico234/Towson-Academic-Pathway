import api from "./api.service";

export default class MajorService {
    async getAllMajors(): Promise<any> {
        const response = await api.get("/majors");
        return response.data;
    }

    async getMajorByName(name: string | undefined): Promise<any> {
        const response = await api.get(
            `/majors/${encodeURIComponent(name || "")}`
        );
        return response.data;
    }
}

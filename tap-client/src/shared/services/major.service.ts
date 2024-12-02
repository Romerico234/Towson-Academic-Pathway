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

    async getMajorByNameWithNoConcentration(
        name: string | undefined
    ): Promise<any> {
        const response = await api.get(
            `/majors/${encodeURIComponent(name || "")}/no-concentration`
        );
        return response.data;
    }

    async getAllConcentrationsForAMajor(
        majorName: string | undefined
    ): Promise<any> {
        const response = await api.get(
            `/majors/${encodeURIComponent(majorName || "")}/concentrations`
        );
        return response.data;
    }

    async getConcentrationByMajorAndName(
        majorName: string | undefined,
        concentrationName: string | undefined
    ): Promise<any> {
        const response = await api.get(
            `/majors/${encodeURIComponent(
                majorName || ""
            )}/concentrations/${encodeURIComponent(concentrationName || "")}`
        );
        return response.data;
    }
}

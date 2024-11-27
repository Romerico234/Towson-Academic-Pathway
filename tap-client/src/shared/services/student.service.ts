import api from "./api.service";

export default class StudentService {
    async getStudentByEmail(email: string): Promise<any> {
        const response = await api.get(`/student/${encodeURIComponent(email)}`);
        return response.data;
    }

    async updateStudentByEmail(email: string, updates: any): Promise<any> {
        const response = await api.put(
            `/student/${encodeURIComponent(email)}`,
            updates
        );
        return response.data;
    }

    async getDegreePlansByEmail(email: string): Promise<any> {
        const response = await api.get(
            `/student/${encodeURIComponent(email)}/degreeplans`
        );
        return response.data;
    }

    async addFavoriteDegreePlan(
        email: string,
        favoriteData: any
    ): Promise<any> {
        const response = await api.post(
            `/student/${encodeURIComponent(email)}/favorites/degreeplans`,
            favoriteData
        );
        return response.data;
    }

    async removeFavoriteDegreePlan(
        email: string,
        favoriteName: string
    ): Promise<any> {
        const response = await api.delete(
            `/student/${encodeURIComponent(
                email
            )}/favorites/degreeplans/${encodeURIComponent(favoriteName)}`
        );
        return response.data;
    }

    async getFavoriteDegreePlansByEmail(email: string): Promise<any> {
        const response = await api.get(
            `/student/${encodeURIComponent(email)}/favorites/degreeplans`
        );
        return response.data;
    }
}

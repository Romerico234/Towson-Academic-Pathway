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

    async getFavoritesByEmail(email: string): Promise<any> {
        const response = await api.get(
            `/student/${encodeURIComponent(email)}/favorites`
        );
        return response.data;
    }

    async addFavoriteByEmail(email: string, favoriteData: any): Promise<any> {
        const response = await api.post(
            `/student/${encodeURIComponent(email)}/favorites`,
            favoriteData
        );
        return response.data;
    }

    async removeFavoriteByEmail(
        email: string,
        favoriteName: string
    ): Promise<void> {
        await api.delete(
            `/student/${encodeURIComponent(
                email
            )}/favorites/${encodeURIComponent(favoriteName)}`
        );
    }
}

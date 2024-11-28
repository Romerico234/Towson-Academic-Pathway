import api from "./api.service";

export default class UserService {
    async getUserById(userId: string): Promise<any> {
        const response = await api.get(`/user/${encodeURIComponent(userId)}`);
        return response.data;
    }

    async updateUserById(userId: string, updates: any): Promise<any> {
        const response = await api.put(
            `/user/${encodeURIComponent(userId)}`,
            updates
        );
        return response.data;
    }

    async getDegreePlanById(userId: string): Promise<any> {
        const response = await api.get(
            `/user/${encodeURIComponent(userId)}/degreeplan`
        );
        return response.data;
    }

    async addFavoriteDegreePlanById(
        userId: string,
        favoriteData: any
    ): Promise<any> {
        const response = await api.post(
            `/user/${encodeURIComponent(userId)}/favorites/degreeplans`,
            favoriteData
        );
        return response.data;
    }

    async removeFavoriteDegreePlanById(
        userId: string,
        favoriteName: string
    ): Promise<any> {
        const response = await api.delete(
            `/user/${encodeURIComponent(
                userId
            )}/favorites/degreeplans/${encodeURIComponent(favoriteName)}`
        );
        return response.data;
    }

    async getFavoriteDegreePlansById(userId: string): Promise<any> {
        const response = await api.get(
            `/user/${encodeURIComponent(userId)}/favorites/degreeplans`
        );
        return response.data;
    }
}

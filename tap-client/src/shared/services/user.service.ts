import api from "./api.service";

export default class UserService {
    async getUserById(userId: string): Promise<any> {
        const response = await api.get(`/user/${encodeURIComponent(userId)}`);
        return response.data;
    }

    async getUserByEmail(email: string): Promise<any> {
        const response = await api.get(
            `/user/email/${encodeURIComponent(email)}`
        );
        return response.data;
    }

    async updateUser(userId: string, updates: any): Promise<any> {
        const response = await api.put(
            `/user/${encodeURIComponent(userId)}`,
            updates
        );
        return response.data;
    }

    async updateUserByEmail(email: string, updates: any): Promise<any> {
        const response = await api.put(`/user/${encodeURIComponent(email)}`, updates);
        return response.data;
    }

    async getDegreePlansByEmail(email: string): Promise<any> {
        const response = await api.get(
            `/user/${encodeURIComponent(email)}/degreeplans`
        );
        return response.data;
    }

    async addFavoriteDegreePlan(
        email: string,
        favoriteData: any
    ): Promise<any> {
        const response = await api.post(
            `/user/${encodeURIComponent(email)}/favorites/degreeplans`,
            favoriteData
        );
        return response.data;
    }

    async removeFavoriteDegreePlan(
        email: string,
        favoriteName: string
    ): Promise<any> {
        const response = await api.delete(
            `/user/${encodeURIComponent(
                email
            )}/favorites/degreeplans/${encodeURIComponent(favoriteName)}`
        );
        return response.data;
    }

    async getFavoriteDegreePlansByEmail(email: string): Promise<any> {
        const response = await api.get(
            `/user/${encodeURIComponent(email)}/favorites/degreeplans`
        );
        return response.data;
    }
}

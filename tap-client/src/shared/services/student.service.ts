import api from "./api.service";

export default class StudentService {
    async getStudentData(): Promise<any> {
        const response = await api.get("/student/profile");
        return response.data;
    }

    async updateStudentData(updates: any): Promise<any> {
        const response = await api.put("/student/profile", updates);
        return response.data;
    }

    async getFavorites(): Promise<any> {
        const response = await api.get("/student/favorites");
        return response.data;
    }

    async addFavorite(favoriteData: any): Promise<any> {
        const response = await api.post("/student/favorites", favoriteData);
        return response.data;
    }

    async removeFavorite(favoriteName: string): Promise<void> {
        await api.delete(
            `/student/favorites/${encodeURIComponent(favoriteName)}`
        );
    }
}

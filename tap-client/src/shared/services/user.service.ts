import api from "./api.service";

export default class UserService {
    async getUserProfile(): Promise<any> {
        const response = await api.get("/user/profile");
        return response.data;
    }

    async updateUserProfile(updates: any): Promise<any> {
        const response = await api.put("/user/profile", updates);
        return response.data;
    }
}

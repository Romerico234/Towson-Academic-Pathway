import api from "./api.service";

export default class TokenService {
    async getUserIdFromToken(token: string): Promise<string | null> {
        try {
            const response = await api.post("/token/get-user-id", { token });
            return response.data.userId || null;
        } catch (error) {
            console.error("Failed to get userId from token:", error);
            return null;
        }
    }
}

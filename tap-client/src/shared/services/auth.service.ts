import api from "./api.service";

export default class AuthService {
    async login(email: string, password: string): Promise<any> {
        const response = await api.post("/auth/login", {
            email,
            password,
        });
        return response.data;
    }

    async register(
        firstName: string,
        lastName: string,
        email: string,
        password: string
    ): Promise<any> {
        const response = await api.post("/auth/register", {
            firstName,
            lastName,
            email,
            password,
        });
        return response.data;
    }
}

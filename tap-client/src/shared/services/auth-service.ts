import api from "./api-service";

export const AuthService = {
    login: async (email: string, password: string) => {
        const response = await api.post("/auth/login", { email, password });
        return response.data; 
    },

    register: async (
        firstName: string,
        lastName: string,
        email: string,
        password: string
    ) => {
        const response = await api.post("/auth/register", {
            firstName,
            lastName,
            email,
            password,
        });
        return response.data; 
    },
};

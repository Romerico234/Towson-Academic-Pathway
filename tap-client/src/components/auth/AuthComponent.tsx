import { createContext, useState } from "react";

interface AuthContextType {
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    token: null,
    login: () => {},
    logout: () => {},
});

export default function AuthProvider({ children }: any) {
    const [token, setToken] = useState<string | null>(
        sessionStorage.getItem("token")
    );

    const login = (token: string) => {
        setToken(token);
        sessionStorage.setItem("token", token);
    };

    const logout = () => {
        setToken(null);
        sessionStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

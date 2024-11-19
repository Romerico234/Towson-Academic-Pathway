import { createContext, useState, useEffect } from "react";

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
        localStorage.getItem("token")
    );

    const login = (token: string) => {
        setToken(token);
        localStorage.setItem("token", token);
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem("token");
    };

    useEffect(() => {
        // Maybe perform validation/fetch user data here
    }, [token]);

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

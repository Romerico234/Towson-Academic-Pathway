import { createContext, useState, useContext, useEffect } from "react";
import AuthService from "../../shared/services/auth.service";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
    token: string | null;
    refreshToken: string | null;
    login: (token: string, refreshToken: string) => void;
    logout: () => void;
    refreshAccessToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    token: null,
    refreshToken: null,
    login: () => {},
    logout: () => {},
    refreshAccessToken: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }: any) {
    const [token, setToken] = useState<string | null>(
        sessionStorage.getItem("token")
    );

    const [refreshToken, setRefreshToken] = useState<string | null>(
        sessionStorage.getItem("refreshToken")
    );

    const authService = new AuthService();

    const login = (newToken: string, newRefreshToken: string) => {
        setToken(newToken);
        setRefreshToken(newRefreshToken);
        sessionStorage.setItem("token", newToken);
        sessionStorage.setItem("refreshToken", newRefreshToken);
    };

    const logout = async () => {
        try {
            if (token && refreshToken) {
                await authService.logout(token, refreshToken);
            }
        } catch (error) {
            console.error("Error during logout:", error);
        } finally {
            // Clear local state and session storage
            setToken(null);
            setRefreshToken(null);
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("refreshToken");
        }
    };

    const refreshAccessToken = async () => {
        if (refreshToken) {
            try {
                const { token: newToken, refreshToken: newRefreshToken } =
                    await authService.refreshTokens(refreshToken);

                login(newToken, newRefreshToken);
            } catch (error) {
                // If refresh fails, logout the user
                logout();
            }
        }
    };

    // Auto-refresh mechanism
    useEffect(() => {
        const checkTokenExpiration = () => {
            if (token) {
                try {
                    // Decode the token to get expiration
                    const decodedToken: { exp: number } = jwtDecode(token);

                    // Convert expiration to milliseconds
                    const expirationTime = decodedToken.exp * 1000;

                    // Current time
                    const currentTime = Date.now();

                    // Check if token is expiring within next 5 minutes
                    const isExpiringSoon =
                        expirationTime - currentTime < 5 * 60 * 1000;

                    if (isExpiringSoon) {
                        refreshAccessToken();
                    }
                } catch (error) {
                    // If token is invalid, logout
                    logout();
                }
            }
        };

        const intervalId = setInterval(checkTokenExpiration, 5 * 60 * 1000); // Check every 5 minutes
        return () => clearInterval(intervalId);
    }, [token, refreshToken]);

    return (
        <AuthContext.Provider
            value={{
                token,
                refreshToken,
                login,
                logout,
                refreshAccessToken,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

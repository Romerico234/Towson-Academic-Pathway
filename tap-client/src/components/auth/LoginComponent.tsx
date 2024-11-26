import { useState, useContext } from "react";
import { AuthContext } from "./AuthComponent";
import { useNavigate } from "react-router-dom";
import AuthService from "../../shared/services/auth.service";
import eyeOn from "../../assets/auth-assets/eye-on.png";
import eyeOff from "../../assets/auth-assets/eye-off.png";

export default function LoginComponent() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const authService = new AuthService();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { token } = await authService.login(email, password);
            login(token);
            navigate("/dashboard");
        } catch (error: any) {
            setError(error.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <form
                onSubmit={handleSubmit}
                className="border-2 border-towsonBlack bg-towsonDarkerWhite p-8 rounded shadow-md w-full max-w-md"
            >
                <h2 className="text-3xl font-bold text-towsonGold mb-6 text-center">
                    Login
                </h2>

                {error && (
                    <div className="mb-4 text-red-500 text-sm text-center">
                        {error}
                    </div>
                )}

                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="block text-towsonGold mb-2"
                    >
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        className="w-full border border-towsonGraphiteLight p-3 rounded bg-white text-towsonBlack focus:outline-none focus:ring-2 focus:ring-towsonGoldLight"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Enter your email"
                    />
                </div>

                <div className="mb-6 relative">
                    <label
                        htmlFor="password"
                        className="block text-towsonGold mb-2"
                    >
                        Password
                    </label>
                    <div className="relative">
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            className="w-full border border-towsonGraphiteLight p-3 rounded bg-white text-towsonBlack focus:outline-none focus:ring-2 focus:ring-towsonGoldLight pr-10"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter your password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-towsonGold focus:outline-none"
                            aria-label={
                                showPassword ? "Hide password" : "Show password"
                            }
                        >
                            <img
                                src={showPassword ? eyeOff : eyeOn}
                                alt={
                                    showPassword
                                        ? "Hide password"
                                        : "Show password"
                                }
                                className="h-5 w-5"
                            />
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-towsonGold text-white py-3 rounded hover:bg-yellow-600 transition-colors duration-300"
                >
                    Login
                </button>
                <p className="mt-4 text-center text-towsonGold">
                    Don't have an account?{" "}
                    <a
                        href="/register"
                        className="underline hover:text-yellow-500"
                    >
                        Register here
                    </a>
                </p>
            </form>
        </div>
    );
}

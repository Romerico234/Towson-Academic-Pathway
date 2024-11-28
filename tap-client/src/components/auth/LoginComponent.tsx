import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../shared/services/auth.service";
import { useAuth } from "./AuthComponent";
import eyeOn from "../../assets/auth-assets/eye-on.png";
import eyeOff from "../../assets/auth-assets/eye-off.png";

export default function LoginComponent() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const authService = new AuthService();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { token, refreshToken } = await authService.login(
                email,
                password
            );
            login(token, refreshToken);
            navigate("/dashboard");
        } catch (error: any) {
            setError("Email or password is incorrect");
        }
    };

    const handleForgotPasswordClick = () => {
        // TODO: Implement forgotten password component
        console.log("Forgot Password clicked");
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

                <div className="mb-6">
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

                    <button
                        type="button"
                        onClick={handleForgotPasswordClick}
                        className="text-black-500 text-sm underline focus:outline-none mt-2"
                    >
                        Forgot Password?
                    </button>
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

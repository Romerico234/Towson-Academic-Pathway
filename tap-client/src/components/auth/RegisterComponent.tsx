import { useState } from "react";
import { useAuth } from "./AuthComponent";
import { useNavigate } from "react-router-dom";
import AuthService from "../../shared/services/auth.service";
import eyeOn from "../../assets/auth-assets/eye-on.png";
import eyeOff from "../../assets/auth-assets/eye-off.png";

export default function RegisterComponent() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const authService = new AuthService();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showVerifyPassword, setShowVerifyPassword] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== verifyPassword) {
            setError("Passwords do not match");
            return;
        }

        setError("");
        try {
            const { token, refreshToken } = await authService.register(
                firstName,
                lastName,
                email,
                password
            );
            login(token, refreshToken);
            navigate("/form");
        } catch (error: any) {
            setError(error.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <form
                onSubmit={handleSubmit}
                className="border-2 mt-[70px] border-towsonBlack bg-towsonDarkerWhite p-8 rounded shadow-md w-full max-w-md"
            >
                <h2 className="text-3xl font-bold text-towsonGold mb-6 text-center">
                    Register
                </h2>

                {error && (
                    <div className="mb-4 text-red-500 text-sm text-center">
                        {error}
                    </div>
                )}

                <div className="mb-4">
                    <label
                        htmlFor="firstName"
                        className="block text-towsonGold mb-2"
                    >
                        First Name
                    </label>
                    <input
                        id="firstName"
                        type="text"
                        className="w-full border border-towsonGraphiteLight p-3 rounded bg-white text-towsonBlack focus:outline-none focus:ring-2 focus:ring-towsonGoldLight"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        placeholder="Enter your first name"
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="lastName"
                        className="block text-towsonGold mb-2"
                    >
                        Last Name
                    </label>
                    <input
                        id="lastName"
                        type="text"
                        className="w-full border border-towsonGraphiteLight p-3 rounded bg-white text-towsonBlack focus:outline-none focus:ring-2 focus:ring-towsonGoldLight"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        placeholder="Enter your last name"
                    />
                </div>

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

                <div className="mb-4 relative">
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

                <div className="mb-6 relative">
                    <label
                        htmlFor="verifyPassword"
                        className="block text-towsonGold mb-2"
                    >
                        Confirm Password
                    </label>
                    <div className="relative">
                        <input
                            id="verifyPassword"
                            type={showVerifyPassword ? "text" : "password"}
                            className="w-full border border-towsonGraphiteLight p-3 rounded bg-white text-towsonBlack focus:outline-none focus:ring-2 focus:ring-towsonGoldLight pr-10"
                            value={verifyPassword}
                            onChange={(e) => setVerifyPassword(e.target.value)}
                            required
                            placeholder="Confirm your password"
                        />
                        <button
                            type="button"
                            onClick={() =>
                                setShowVerifyPassword(!showVerifyPassword)
                            }
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-towsonGold focus:outline-none"
                            aria-label={
                                showVerifyPassword
                                    ? "Hide password"
                                    : "Show password"
                            }
                        >
                            <img
                                src={showVerifyPassword ? eyeOff : eyeOn}
                                alt={
                                    showVerifyPassword
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
                    Register
                </button>
                <p className="mt-4 text-center text-towsonGold">
                    Already have an account?{" "}
                    <a
                        href="/login"
                        className="underline hover:text-yellow-500"
                    >
                        Login here
                    </a>
                </p>
            </form>
        </div>
    );
}

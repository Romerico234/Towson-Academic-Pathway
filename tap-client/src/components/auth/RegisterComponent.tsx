import { useState, useContext } from "react";
import { AuthContext } from "./AuthComponent";
import { useNavigate } from "react-router-dom";
import AuthService from "../../shared/services/auth.service";

export default function RegisterComponent() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const authService = new AuthService();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== verifyPassword) {
            setError("Passwords do not match");
            return;
        }

        setError("");

        try {
            const { token } = await authService.register(
                firstName,
                lastName,
                email,
                password
            );
            login(token);
            navigate("/form", { state: { firstName, lastName, email } });
        } catch (error: any) {
            alert(error.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-towsonMist">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded shadow-md w-96"
            >
                <h2 className="text-2xl font-bold mb-6">Register</h2>

                <div className="mb-4">
                    <label className="block text-gray-700">First Name</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 p-2 rounded"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Last Name</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 p-2 rounded"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        className="w-full border border-gray-300 p-2 rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        className="w-full border border-gray-300 p-2 rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        className="w-full border border-gray-300 p-2 rounded"
                        value={verifyPassword}
                        onChange={(e) => setVerifyPassword(e.target.value)}
                        required
                    />
                </div>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                <button className="w-full bg-towsonGold text-white py-2 px-4 rounded hover:bg-yellow-600">
                    Register
                </button>

                <p className="mt-4">
                    Already have an account?{" "}
                    <a href="/login" className="text-towsonGold">
                        Login here
                    </a>
                </p>
            </form>
        </div>
    );
}

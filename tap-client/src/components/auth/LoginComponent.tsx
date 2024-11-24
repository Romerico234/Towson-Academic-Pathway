import { useState, useContext } from "react";
import { AuthContext } from "./AuthComponent";
import { useNavigate } from "react-router-dom";
import AuthService  from "../../shared/services/auth.service";

export default function LoginComponent() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const authService = new AuthService();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { token } = await authService.login(email, password);
            login(token);
            navigate("/preferences-form");
        } catch (error: any) {
            alert(error.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-towsonMist">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded shadow-md w-96"
            >
                <h2 className="text-2xl font-bold mb-6">Login</h2>
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
                <div className="mb-6">
                    <label className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        className="w-full border border-gray-300 p-2 rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button className="w-full bg-towsonGold text-white py-2 px-4 rounded hover:bg-yellow-600">
                    Login
                </button>
                <p className="mt-4">
                    Don't have an account?{" "}
                    <a href="/register" className="text-towsonGold">
                        Register here
                    </a>
                </p>
            </form>
        </div>
    );
}

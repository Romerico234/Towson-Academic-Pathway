import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthComponent";

export default function NavbarComponent() {
    const { token, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    // Redirect to FormsComponent on login
    useEffect(() => {
        if (token) {
            navigate("/preferences-form");
        }
    }, [token, navigate]);

    const commonStyles = `
        text-towsonWhite hover:text-towsonLineGold text-base font-normal transition duration-300 ease-in-out transform hover:scale-105
    `;

    return (
        <nav className="bg-towsonBlack fixed top-0 w-full shadow-lg border-b-4 border-towsonGold">
            <div className="flex items-center h-16 px-8 justify-between">
                <Link
                    to="/home"
                    className="text-2xl font-bold text-towsonGold hover:text-towsonLineGold transition duration-300"
                >
                    Towson Academic Planner
                </Link>

                <div className="flex items-center space-x-6">
                    {token ? (
                        <>
                            {/* For Authenticated Users*/}
                            <Link
                                to="/preferences-form"
                                className={commonStyles}
                            >
                                Preferences Form
                            </Link>
                            <Link to="/degree-plan" className={commonStyles}>
                                Degree Completion Plan
                            </Link>
                            <Link
                                to="/active-semester-plan"
                                className={commonStyles}
                            >
                                Active Semester Plan
                            </Link>
                            <Link to="/about" className={commonStyles}>
                                About
                            </Link>
                            <Link to="/faq" className={commonStyles}>
                                FAQ
                            </Link>
                            <Link to="/settings" className={commonStyles}>
                                Settings
                            </Link>
                            <button
                                onClick={logout}
                                className="text-towsonWhite px-4 py-2 bg-red-600 hover:bg-red-700 rounded transition duration-300"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            {/* For Unauthenticated Users */}
                            <Link to="/login" className={commonStyles}>
                                Login
                            </Link>
                            <Link to="/register" className={commonStyles}>
                                Register
                            </Link>
                        </>
                    )}
                </div>

                <button
                    className="lg:hidden p-2 rounded-full transition duration-300 transform hover:scale-125"
                    aria-controls="navbar-content"
                    aria-expanded="false"
                >
                    <img
                        src="src/assets/navbar-images/menu.png"
                        alt="Menu"
                        className="w-8 h-8"
                    />
                </button>
            </div>
        </nav>
    );
}

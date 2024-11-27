import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthComponent";

export default function SidebarComponent() {
    const [isOpen, setIsOpen] = useState(true);
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className={`sidebar bg-gray-200 p-4 ${isOpen ? "w-64" : "w-16"}`}>
            <button onClick={toggleSidebar} className="mb-4">
                {isOpen ? "Close" : "Open"}
            </button>
            <ul className="space-y-2">
                {/* Link back to public home page */}
                <li>
                    <Link to="/home" className="block p-2 hover:bg-gray-300">
                        Public Home
                    </Link>
                </li>
                <li>
                    <Link
                        to="/dashboard"
                        className="block p-2 hover:bg-gray-300"
                    >
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link
                        to="/course-catalog"
                        className="block p-2 hover:bg-gray-300"
                    >
                        Course Catalog
                    </Link>
                </li>
                <li>
                    <Link
                        to="/degree-planner"
                        className="block p-2 hover:bg-gray-300"
                    >
                        Degree Planner
                    </Link>
                </li>
            </ul>
            <div className="profile-section mt-auto">
                <Link to="/settings" className="block p-2 hover:bg-gray-300">
                    Settings
                </Link>
                <button
                    onClick={handleLogout}
                    className="w-full text-left p-2 hover:bg-gray-300"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

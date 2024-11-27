import { Link } from "react-router-dom";

export default function NavbarComponent() {
    return (
        <nav className="navbar bg-gray-800 text-white p-4">
            <ul className="flex space-x-4">
                <li>
                    <Link to="/home" className="hover:text-yellow-500">
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/about" className="hover:text-yellow-500">
                        About
                    </Link>
                </li>
                <li>
                    <Link to="/login" className="hover:text-yellow-500">
                        Sign In
                    </Link>
                </li>
                <li>
                    <Link to="/register" className="hover:text-yellow-500">
                        Get Started
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

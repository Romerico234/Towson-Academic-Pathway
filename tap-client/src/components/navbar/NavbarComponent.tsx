import { useState } from "react";
import { Link } from "react-router-dom";
import menuImg from "../../assets/navbar-assets/menu.png";

export default function NavbarComponent() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="bg-towsonBlack fixed top-0 w-full shadow-lg border-b-4 border-towsonGold z-50">
            <div className="flex items-center h-16 px-8 justify-between">
                {/* Wrapper for Tooltip */}
                <div className="relative group">
                    <Link
                        to="/home"
                        className="text-2xl font-bold text-towsonGold transition duration-300 flex items-center"
                    >
                        Towson Academic Planner
                    </Link>

                    {/* Tooltip */}
                    <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        Go to home page
                        <svg
                            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full w-2 h-2 text-gray-800"
                            fill="currentColor"
                            viewBox="0 0 8 8"
                        >
                            <path d="M0 0 L4 4 L8 0 Z" />
                        </svg>
                    </span>
                </div>

                <div className="hidden lg:flex items-center space-x-6">
                    {/* Sign In Link */}
                    <Link
                        to="/login"
                        className="relative px-3 py-2 rounded transition duration-300 hover:bg-gray-700"
                    >
                        <span className="text-towsonGold transition duration-300">
                            Sign In
                        </span>
                    </Link>

                    {/* Get Started Link */}
                    <Link
                        to="/register"
                        className="relative px-3 py-2 rounded transition duration-300 hover:bg-gray-700"
                    >
                        <span className="text-towsonGold transition duration-300">
                            Get Started
                        </span>
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="lg:hidden p-2 rounded-full transition duration-300 transform hover:scale-125 focus:outline-none"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-controls="navbar-content"
                    aria-expanded={isMenuOpen}
                >
                    <img src={menuImg} alt="Menu" className="w-8 h-8" />
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div id="navbar-content" className="lg:hidden px-8 pb-4">
                    <Link
                        to="/login"
                        className="block px-3 py-2 rounded transition duration-300 hover:bg-gray-700 mb-2"
                        onClick={() => setIsMenuOpen(false)} // Close menu on link click
                    >
                        <span className="text-white">Sign In</span>
                    </Link>
                    <Link
                        to="/register"
                        className="block px-3 py-2 rounded transition duration-300 hover:bg-gray-700"
                        onClick={() => setIsMenuOpen(false)} // Close menu on link click
                    >
                        <span className="text-white">Get Started</span>
                    </Link>
                </div>
            )}
        </nav>
    );
}

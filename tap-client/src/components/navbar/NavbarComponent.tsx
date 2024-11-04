import { Link } from "react-router-dom";

export default function NavbarComponent() {
    return (
        <nav className="bg-towsonBlack fixed top-0 w-full shadow-lg border-b-4 border-towsonGold">
            <div className="flex items-center h-16 px-8 justify-between">
                <Link
                    to="/home"
                    className="text-2xl font-bold text-towsonWhite hover:text-towsonLineGold transition duration-300"
                >
                    Towson Academic Planner
                </Link>

                <div className="flex items-center">
                    <div
                        id="navbar-content"
                        className="hidden lg:flex space-x-6 items-center"
                    >
                        {[
                            {
                                to: "/preferences-form",
                                label: "Preferences Form",
                            },
                            { to: "/course-catalog", label: "Course Catalog" },
                            {
                                to: "/degree-plan",
                                label: "Degree Completion Plan",
                            },
                            {
                                to: "/active-semester-plan",
                                label: "Active Semester Plan",
                            },
                            { to: "/about", label: "About" },
                            { to: "/faq", label: "FAQ" },
                            { to: "/settings", label: "Settings" },
                        ].map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className="text-towsonWhite hover:text-towsonLineGold text-base font-normal transition duration-300 ease-in-out transform hover:scale-105"
                            >
                                {link.label}
                            </Link>
                        ))}
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
            </div>
        </nav>
    );
}

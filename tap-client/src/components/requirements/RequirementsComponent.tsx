import { Link } from "react-router-dom";

export default function RequirementsComponent() {
    return (
        <div className="flex h-screen overflow-hidden">
            {/* Main Content Area */}
            <div className="flex-grow flex flex-col border-r p-4">
                <header className="mb-4">
                    <h1 className="text-2xl font-bold border-b pb-2">
                        Academic Requirements
                    </h1>
                </header>
                <div className="flex-grow overflow-auto rounded-lg bg-white shadow p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Majors Section */}
                        <div className="bg-towsonDarkerWhite shadow-md rounded p-6 hover:shadow-lg transition-shadow">
                            <h2 className="text-xl font-semibold mb-4 text-towsonGoldDark">
                                Majors
                            </h2>
                            <p className="mb-4 text-gray-700">
                                Explore the list of majors offered, along with
                                their detailed requirements.
                            </p>
                            <Link
                                to="/requirements/majors"
                                className="text-blue-500 hover:underline"
                            >
                                View Majors &rarr;
                            </Link>
                        </div>

                        {/* Degree Requirements Section */}
                        <div className="bg-towsonDarkerWhite shadow-md rounded p-6 hover:shadow-lg transition-shadow">
                            <h2 className="text-xl font-semibold mb-4 text-towsonGoldDark">
                                Degree Requirements
                            </h2>
                            <p className="mb-4 text-gray-700">
                                Review the general degree requirements for
                                graduation.
                            </p>
                            <Link
                                to="/requirements/degree"
                                className="text-blue-500 hover:underline"
                            >
                                View Degree Requirements &rarr;
                            </Link>
                        </div>

                        {/* Honors Requirements Section */}
                        <div className="bg-towsonDarkerWhite shadow-md rounded p-6 hover:shadow-lg transition-shadow">
                            <h2 className="text-xl font-semibold mb-4 text-towsonGoldDark">
                                Honors Requirements
                            </h2>
                            <p className="mb-4 text-gray-700">
                                Learn about the honors program and its specific
                                requirements.
                            </p>
                            <Link
                                to="/requirements/honors"
                                className="text-blue-500 hover:underline"
                            >
                                View Honors Requirements &rarr;
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

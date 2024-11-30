import { Link } from "react-router-dom";

export default function RequirementsComponent() {
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Academic Requirements</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Majors Section */}
                <div className="bg-white shadow-md rounded p-6">
                    <h2 className="text-2xl font-semibold mb-4">Majors</h2>
                    <p className="mb-4">
                        Explore the list of majors offered, along with their
                        detailed requirements.
                    </p>
                    <Link
                        to="/requirements/majors"
                        className="text-blue-500 hover:underline"
                    >
                        View Majors &rarr;
                    </Link>
                </div>

                {/* Degree Requirements Section */}
                <div className="bg-white shadow-md rounded p-6">
                    <h2 className="text-2xl font-semibold mb-4">
                        Degree Requirements
                    </h2>
                    <p className="mb-4">
                        Review the general degree requirements for graduation.
                    </p>
                    <Link
                        to="/requirements/degree"
                        className="text-blue-500 hover:underline"
                    >
                        View Degree Requirements &rarr;
                    </Link>
                </div>

                {/* Honors Requirements Section */}
                <div className="bg-white shadow-md rounded p-6">
                    <h2 className="text-2xl font-semibold mb-4">
                        Honors Requirements
                    </h2>
                    <p className="mb-4">
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
    );
}

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MajorService from "../../shared/services/major.service";

interface Major {
    name: string;
    totalUnits: string;
    concentrations?: Concentration[];
}

interface Concentration {
    name: string;
    totalUnits: string;
}

export default function MajorsListComponent() {
    const [majors, setMajors] = useState<Major[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchMajors = async () => {
            try {
                const majorService = new MajorService();
                const majorsData = await majorService.getAllMajors();
                setMajors(majorsData);
            } catch (error) {
                console.error("Error fetching majors:", error);
            }
        };

        fetchMajors();
    }, []);

    const filteredMajors = majors.filter((major) =>
        major.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Majors</h1>

            {/* Search Bar */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search majors..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-2 border rounded shadow-sm"
                />
            </div>

            {/* Majors List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredMajors.map((major) => (
                    <div
                        key={major.name}
                        className="bg-white shadow-md rounded p-6"
                    >
                        <h2 className="text-2xl font-semibold mb-2">
                            {major.name}
                        </h2>
                        <p className="mb-4">Total Units: {major.totalUnits}</p>
                        <Link
                            to={`/requirements/majors/${encodeURIComponent(
                                major.name
                            )}`}
                            className="text-blue-500 hover:underline"
                        >
                            View Requirements &rarr;
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

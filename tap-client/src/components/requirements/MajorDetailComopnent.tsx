import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MajorService from "../../shared/services/major.service";
import Lottie from "lottie-react";
import loadingAnimation from "../../assets/lottie-assets/loading.json";

interface Major {
    name: string;
    totalUnits: string;
    generalRequirements: any;
    concentrations?: Concentration[];
    notes?: string[];
}

interface Concentration {
    name: string;
    totalUnits: string;
    requirements: any;
}

export default function MajorDetailComponent() {
    const { majorName } = useParams<{ majorName: string }>();
    const [major, setMajor] = useState<Major | null>(null);
    const [selectedConcentration, setSelectedConcentration] =
        useState<Concentration | null>(null);

    useEffect(() => {
        const fetchMajor = async () => {
            try {
                const majorService = new MajorService();
                const majorData = await majorService.getMajorByName(majorName);
                setMajor(majorData);

                if (
                    majorData.concentrations &&
                    majorData.concentrations.length > 0
                ) {
                    setSelectedConcentration(majorData.concentrations[0]);
                }
            } catch (error) {
                console.error("Error fetching major details:", error);
            }
        };

        fetchMajor();
    }, [majorName]);

    if (!major) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Lottie
                    animationData={loadingAnimation}
                    loop={true} // Set looping
                    autoplay={true} // Set autoplay
                    height={150} 
                    width={150} 
                />
            </div>
        );
    }

    const handleConcentrationChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const concentrationName = e.target.value;
        const concentration = major.concentrations?.find(
            (c) => c.name === concentrationName
        );
        setSelectedConcentration(concentration || null);
    };

    const renderRequirements = (requirements: any) => {
        return (
            <div>
                {Object.entries(requirements).map(
                    ([category, courses]: any, index) => (
                        <div key={index} className="mb-4">
                            <h3 className="text-xl font-semibold mb-2">
                                {category}
                            </h3>
                            {Array.isArray(courses) ? (
                                <ul className="list-disc pl-6">
                                    {courses.map((course: any, idx: number) => (
                                        <li key={idx}>
                                            <strong>{course.code}</strong>:{" "}
                                            {course.courseTitle} ({course.units}{" "}
                                            units)
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                renderRequirements(courses)
                            )}
                        </div>
                    )
                )}
            </div>
        );
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">{major.name}</h1>
            <p className="mb-4">Total Units: {major.totalUnits}</p>

            {/* Concentrations */}
            {major.concentrations && major.concentrations.length > 0 && (
                <div className="mb-6">
                    <label className="block mb-2 font-semibold">
                        Concentration:
                    </label>
                    <select
                        value={selectedConcentration?.name || ""}
                        onChange={handleConcentrationChange}
                        className="p-2 border rounded"
                    >
                        {major.concentrations.map((concentration) => (
                            <option
                                key={concentration.name}
                                value={concentration.name}
                            >
                                {concentration.name}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* Requirements */}
            <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-4">Requirements</h2>
                {selectedConcentration
                    ? renderRequirements(selectedConcentration.requirements)
                    : renderRequirements(major.generalRequirements)}
            </div>

            {/* Notes */}
            {major.notes && major.notes.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">Notes</h2>
                    <ul className="list-disc pl-6">
                        {major.notes.map((note, idx) => (
                            <li key={idx}>{note}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

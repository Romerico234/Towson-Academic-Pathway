import { useState, useEffect } from "react";
import RequirementsService from "../../shared/services/requirements.service";
import Lottie from "lottie-react";
import loadingAnimation from "../../assets/lottie-assets/loading.json";

export default function DegreeRequirementsComponent() {
    const [degreeRequirements, setDegreeRequirements] = useState<any>(null);

    useEffect(() => {
        const fetchDegreeRequirements = async () => {
            try {
                const requirementsService = new RequirementsService();
                const data = await requirementsService.getDegreeRequirements();
                setDegreeRequirements(data);
            } catch (error) {
                console.error("Error fetching degree requirements:", error);
            }
        };

        fetchDegreeRequirements();
    }, []);

    if (!degreeRequirements) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Lottie
                    animationData={loadingAnimation}
                    loop={true} // Set looping
                    autoplay={true} // Set autoplay
                    height={150} // Set height
                    width={150} // Set width
                />
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Degree Requirements</h1>

            {/* General Requirements */}
            <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-4">
                    General Requirements
                </h2>
                <ul className="list-disc pl-6">
                    <li>
                        Minimum Earned Units:{" "}
                        {
                            degreeRequirements.generalRequirements
                                .minimumEarnedUnits
                        }
                    </li>
                    <li>
                        Upper-Level Units:{" "}
                        {degreeRequirements.generalRequirements.upperLevelUnits}
                    </li>
                    <li>
                        Cumulative GPA Requirement:{" "}
                        {
                            degreeRequirements.generalRequirements
                                .cumulativeGpaRequirement
                        }
                    </li>
                    {/* Add more as needed */}
                </ul>
            </div>

            {/* Degree Types */}
            <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-4">Degree Types</h2>
                {degreeRequirements.degreeTypes.map(
                    (degreeType: any, idx: number) => (
                        <div key={idx} className="mb-4">
                            <h3 className="text-xl font-semibold">
                                {degreeType.type}
                            </h3>
                            {degreeType.additionalRequirements && (
                                <ul className="list-disc pl-6">
                                    {Object.entries(
                                        degreeType.additionalRequirements
                                    ).map(([key, value]: any, index) => (
                                        <li key={index}>
                                            <strong>{key}</strong>:{" "}
                                            {JSON.stringify(value)}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )
                )}
            </div>

            {/* Satisfactory Progress */}
            <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-4">
                    Satisfactory Progress
                </h2>
                <ul className="list-disc pl-6">
                    {degreeRequirements.satisfactoryProgress.requirements.map(
                        (req: string, idx: number) => (
                            <li key={idx}>{req}</li>
                        )
                    )}
                </ul>
            </div>
        </div>
    );
}

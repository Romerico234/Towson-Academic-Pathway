import { useState, useEffect } from "react";
import RequirementsService from "../../shared/services/requirements.service";
import Lottie from "lottie-react";
import loadingAnimation from "../../assets/lottie-assets/loading.json";

export default function HonorsRequirementsComponent() {
    const [honorsRequirements, setHonorsRequirements] = useState<any>(null);

    useEffect(() => {
        const fetchHonorsRequirements = async () => {
            try {
                const requirementsService = new RequirementsService();
                const data = await requirementsService.getHonorsRequirements();
                setHonorsRequirements(data);
            } catch (error) {
                console.error("Error fetching honors requirements:", error);
            }
        };

        fetchHonorsRequirements();
    }, []);

    if (!honorsRequirements) {
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

    const renderCoursework = (coursework: any) => {
        return (
            <div>
                {Object.entries(coursework).map(
                    ([category, details]: any, idx) => (
                        <div key={idx} className="mb-6">
                            <h3 className="text-xl font-semibold mb-2">
                                {category}
                            </h3>
                            <p>Total Units: {details.totalUnits}</p>
                            {details.courses && (
                                <div>
                                    <h4 className="text-lg font-semibold mt-2">
                                        Courses:
                                    </h4>
                                    <ul className="list-disc pl-6">
                                        {details.courses.map(
                                            (course: any, index: number) => (
                                                <li key={index}>
                                                    <strong>
                                                        {course.name}
                                                    </strong>{" "}
                                                    - {course.units} units
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            )}
                            {details.options && (
                                <div>
                                    <h4 className="text-lg font-semibold mt-2">
                                        Options:
                                    </h4>
                                    <ul className="list-disc pl-6">
                                        {details.options.map(
                                            (option: string, index: number) => (
                                                <li key={index}>{option}</li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            )}
                            {details.notes && (
                                <div>
                                    <h4 className="text-lg font-semibold mt-2">
                                        Notes:
                                    </h4>
                                    <ul className="list-disc pl-6">
                                        {details.notes.map(
                                            (note: string, index: number) => (
                                                <li key={index}>{note}</li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )
                )}
            </div>
        );
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Honors Requirements</h1>

            {/* Total Units Required */}
            <div className="mb-6">
                <p>
                    <strong>Total Units Required:</strong>{" "}
                    {honorsRequirements.totalUnitsRequired}
                </p>
            </div>

            {/* Coursework */}
            <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-4">Coursework</h2>
                {renderCoursework(honorsRequirements.coursework)}
            </div>

            {/* Good Standing */}
            <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-4">
                    Good Standing Requirements
                </h2>
                {/* Display goodStanding details */}
                {/* Implement as needed */}
            </div>

            {/* Additional Notes */}
            {honorsRequirements.additionalNotes && (
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">
                        Additional Notes
                    </h2>
                    <ul className="list-disc pl-6">
                        {honorsRequirements.additionalNotes.map(
                            (note: string, idx: number) => (
                                <li key={idx}>{note}</li>
                            )
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}

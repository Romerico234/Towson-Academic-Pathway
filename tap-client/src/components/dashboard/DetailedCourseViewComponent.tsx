import { useEffect, useState } from "react";
import CourseService from "../../shared/services/course.service";
import Lottie from "lottie-react";
import loadingAnimation from "../../assets/lottie-assets/loading.json";

interface DetailedCourseViewProps {
    subject: string;
    catalogNumber: string;
    onClose: () => void;
}

interface CourseDetails {
    institution: string;
    acadCareer: string;
    subject: string;
    catalogNumber: string;
    courseTitle: string;
    termsOffered: string[];
    description: string;
    units: string;
    gradingBasis: string;
    campus: string;
}

export default function DetailedCourseViewComponent({
    subject,
    catalogNumber,
    onClose,
}: DetailedCourseViewProps) {
    const [courseDetails, setCourseDetails] = useState<CourseDetails | null>(
        null
    );
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const courseService = new CourseService();
                const courseData =
                    await courseService.getCourseBySubjectAndCatalogNumber(
                        subject,
                        catalogNumber
                    );
                setCourseDetails(courseData);
            } catch (error) {
                console.error("Error fetching course details:", error);
                setCourseDetails(null);
            } finally {
                setLoading(false);
            }
        };

        fetchCourseDetails();
    }, [subject, catalogNumber]);

    if (loading) {
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

    if (!courseDetails) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-4 rounded shadow">
                    <p>Course details are unavailable at this time.</p>
                    <button
                        onClick={onClose}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    }

    const {
        institution,
        acadCareer,
        courseTitle,
        termsOffered,
        description,
        units,
        gradingBasis,
        campus,
    } = courseDetails;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow max-w-lg w-full">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">
                        {subject} {catalogNumber} - {courseTitle}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-600 hover:text-gray-800 text-2xl"
                    >
                        &times;
                    </button>
                </div>
                <div className="space-y-2">
                    <p>
                        <strong>Institution:</strong> {institution}
                    </p>
                    <p>
                        <strong>Academic Career:</strong> {acadCareer}
                    </p>
                    <p>
                        <strong>Units:</strong> {units}
                    </p>
                    <p>
                        <strong>Grading Basis:</strong> {gradingBasis}
                    </p>
                    <p>
                        <strong>Campus:</strong> {campus}
                    </p>
                    <p>
                        <strong>Terms Offered:</strong>{" "}
                        {termsOffered.join(", ")}
                    </p>
                    <p>
                        <strong>Description:</strong> {description}
                    </p>
                </div>
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

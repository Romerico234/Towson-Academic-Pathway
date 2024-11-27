interface CourseDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    course: any;
}

export default function CourseDetailsModal({
    isOpen,
    onClose,
    course,
}: CourseDetailsModalProps) {
    if (!isOpen || !course) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded p-6 w-96">
                <h2 className="text-xl font-bold mb-4">
                    {course.title} ({course.subject} {course.catalogNumber})
                </h2>
                <p className="mb-2">
                    <strong>Units:</strong> {course.units}
                </p>
                <p className="mb-2">
                    <strong>Description:</strong> {course.description}
                </p>
                <p className="mb-2">
                    <strong>Prerequisites:</strong>{" "}
                    {course.prerequisites || "None"}
                </p>
                <button
                    onClick={onClose}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Close
                </button>
            </div>
        </div>
    );
}

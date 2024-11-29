import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import DetailedCourseViewComponent from "./DetailedCourseViewComponent";

interface Course {
    subject: string;
    catalogNumber: string;
    title: string;
    units: string;
}

interface CourseCardProps {
    course: Course;
    fromSemester?: string;
}

export default function CourseCardComponent({
    course,
    fromSemester,
}: CourseCardProps) {
    const [showDetails, setShowDetails] = useState(false);

    const { subject, catalogNumber, title, units } = course;

    const { attributes, listeners, setNodeRef, transform, isDragging } =
        useDraggable({
            id: fromSemester
                ? `${fromSemester}-${subject}-${catalogNumber}`
                : `${subject}-${catalogNumber}`,
            data: {
                course,
                fromSemester,
                type: "course",
            },
        });

    const style = {
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <>
            <div
                ref={setNodeRef}
                style={style}
                {...listeners}
                {...attributes}
                className="p-4 border rounded shadow hover:bg-gray-100 cursor-pointer flex justify-between items-center"
            >
                <p>
                    {subject} {catalogNumber} - {title} ({units} units)
                </p>
                <button
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering drag event
                        setShowDetails(true);
                    }}
                    className="text-blue-500 hover:text-blue-700"
                >
                    Details
                </button>
            </div>
            {showDetails && (
                <DetailedCourseViewComponent
                    subject={subject}
                    catalogNumber={catalogNumber}
                    onClose={() => setShowDetails(false)}
                />
            )}
        </>
    );
}

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

interface CourseCardProps {
    course: string;
    fromSemester: string;
}

export default function CourseCardComponent({
    course,
    fromSemester,
}: CourseCardProps) {
    const { attributes, listeners, setNodeRef, transform, isDragging } =
        useDraggable({
            id: `${fromSemester}-${course}`, // Unique ID combining semester and course
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
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className="p-4 border rounded shadow hover:bg-gray-100 cursor-pointer"
        >
            <p>{course}</p>
        </div>
    );
}

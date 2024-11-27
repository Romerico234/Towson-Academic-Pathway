interface CourseComponentProps {
    course: any;
    onClick: () => void;
}

export default function CourseComponent({
    course,
    onClick,
}: CourseComponentProps) {
    return (
        <div
            className="border p-2 rounded mb-2 cursor-pointer hover:bg-gray-100"
            onClick={onClick}
        >
            <h3 className="text-md font-semibold">
                {course.title} ({course.subject} {course.catalogNumber})
            </h3>
        </div>
    );
}

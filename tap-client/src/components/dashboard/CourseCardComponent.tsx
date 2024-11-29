interface CourseCardProps {
    course: string;
}

export default function CourseCardComponent({ course }: CourseCardProps) {
    return (
        <div className="p-4 border rounded shadow hover:bg-gray-100 cursor-pointer">
            <p>{course}</p>
        </div>
    );
}

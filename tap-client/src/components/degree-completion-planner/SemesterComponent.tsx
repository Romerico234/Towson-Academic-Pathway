import CourseComponent from "./CourseComponent";

interface SemesterComponentProps {
    semester: any;
    onCourseClick: (course: any) => void;
}

export default function SemesterComponent({
    semester,
    onCourseClick,
}: SemesterComponentProps) {
    const totalUnits = semester.plannedCourses.reduce(
        (sum: number, course: any) => sum + course.units,
        0
    );

    return (
        <div className="border p-4 rounded mb-4">
            <h2 className="text-lg font-bold mb-2">
                {semester.semester} - Total Units: {totalUnits}
            </h2>
            {semester.plannedCourses.map((course: any, index: number) => (
                <CourseComponent
                    key={index}
                    course={course}
                    onClick={() => onCourseClick(course)}
                />
            ))}
        </div>
    );
}

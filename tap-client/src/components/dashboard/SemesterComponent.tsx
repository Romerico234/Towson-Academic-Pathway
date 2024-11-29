import { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import CourseCardComponent from "./CourseCardComponent";

interface SemesterProps {
    semester: string;
    plannedCourses: string[];
    creditHours: number;
    notes: string;
}

export default function SemesterComponent({
    semester,
    plannedCourses = [],
    creditHours,
    notes,
}: SemesterProps) {
    const [courses, setCourses] = useState<string[]>(plannedCourses);

    const handleDrop = (event: any) => {
        const newCourse = event?.active?.data?.current;
        if (newCourse && !courses.includes(newCourse)) {
            setCourses([...courses, newCourse]);
        }
    };

    return (
        <DndContext onDragEnd={handleDrop}>
            <div className="p-4 border rounded-lg shadow-md bg-white">
                <h2 className="text-lg font-semibold mb-2">{semester}</h2>
                <p className="text-sm mb-4">{creditHours} Credit Hours</p>
                <p className="text-sm italic mb-4 text-gray-600">{notes}</p>

                <div className="space-y-2">
                    {courses.map((course, index) => (
                        <CourseCardComponent key={index} course={course} />
                    ))}
                </div>

                <div className="mt-4 border-t pt-2">
                    <p className="text-sm italic text-gray-500">
                        Drag and drop courses here
                    </p>
                </div>
            </div>
        </DndContext>
    );
}

import { useDroppable } from "@dnd-kit/core";
import { useState } from "react";
import CourseCardComponent from "./CourseCardComponent";
import removeImg from "../../assets/dashboard-assets/remove.png";

interface SemesterProps {
    semester: string;
    plannedCourses: string[];
    creditHours: number;
    notes: string;
    removeCourse: (course: string) => void;
    removeSemester: () => void;
    canDeleteSemester: boolean; // Added prop
}

export default function SemesterComponent({
    semester,
    plannedCourses = [],
    creditHours,
    notes,
    removeCourse,
    removeSemester,
    canDeleteSemester, // Destructure the prop
}: SemesterProps) {
    const { isOver, setNodeRef } = useDroppable({
        id: semester,
        data: {
            type: "semester",
        },
    });

    const [isEditing, setIsEditing] = useState(false);

    const style = {
        backgroundColor: isOver ? "lightblue" : undefined,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="p-4 border rounded-lg shadow-md bg-white relative"
        >
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">{semester}</h2>
                <div>
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="px-3 py-1 border rounded-lg text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white transition"
                    >
                        {isEditing ? "Done" : "Edit"}
                    </button>
                    {isEditing && canDeleteSemester && (
                        <button
                            onClick={removeSemester}
                            className="ml-2 px-3 py-1 border rounded-lg text-red-500 border-red-500 hover:bg-red-500 hover:text-white transition"
                        >
                            Delete Semester
                        </button>
                    )}
                </div>
            </div>
            <p className="text-sm mb-4">{creditHours} Credit Hours</p>
            <p className="text-sm italic mb-4 text-gray-600">{notes}</p>

            <div className="space-y-2">
                {plannedCourses.map((course, index) => (
                    <div key={index} className="relative">
                        {/* Course Card */}
                        <CourseCardComponent
                            course={course}
                            fromSemester={semester}
                        />

                        {/* Remove Button */}
                        {isEditing && (
                            <button
                                onClick={() => removeCourse(course)}
                                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-red-100 p-1 rounded-full hover:bg-red-200 transition"
                            >
                                <img
                                    src={removeImg}
                                    alt="Remove"
                                    className="w-4 h-4"
                                />
                            </button>
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-4 border-t pt-2 text-center text-sm italic text-gray-500">
                Drag and drop courses here
            </div>
        </div>
    );
}

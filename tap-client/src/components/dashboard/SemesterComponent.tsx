import { useDroppable } from "@dnd-kit/core";
import { useState } from "react";
import CourseCardComponent from "./CourseCardComponent";
import NoteCardViewComponent from "./NoteCardViewComponent";
import removeImg from "../../assets/dashboard-assets/remove.png";

interface Course {
    subject: string;
    catalogNumber: string;
    title: string;
    units: string;
}

interface SemesterProps {
    semester: string;
    plannedCourses: Course[];
    notes: string;
    removeCourse: (course: Course) => void;
    removeSemester: () => void;
    canDeleteSemester: boolean;
    updateNotes: (newNotes: string) => void; 
}

export default function SemesterComponent({
    semester,
    plannedCourses = [],
    notes,
    removeCourse,
    removeSemester,
    canDeleteSemester,
    updateNotes, 
}: SemesterProps) {
    const { isOver, setNodeRef } = useDroppable({
        id: semester,
        data: {
            type: "semester",
        },
    });

    const [isEditing, setIsEditing] = useState(false);
    const [showNoteView, setShowNoteView] = useState(false);
    const [editableNotes, setEditableNotes] = useState(notes);

    const style = {
        backgroundColor: isOver ? "lightblue" : undefined,
    };

    const creditHours = plannedCourses.reduce((total, course) => {
        const units = parseFloat(course.units);
        return total + (isNaN(units) ? 0 : units);
    }, 0);

    const truncatedNotes =
        editableNotes.length > 100
            ? `${editableNotes.slice(0, 100)}...`
            : editableNotes;

    const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditableNotes(e.target.value);
    };

    const toggleEditMode = () => {
        if (isEditing) {
            if (editableNotes !== notes) {
                updateNotes(editableNotes);
            }
        }
        setIsEditing(!isEditing);
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
                        onClick={toggleEditMode}
                        className="px-3 py-1 border rounded-lg text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white transition"
                    >
                        {isEditing ? "Done" : "Edit"}
                    </button>
                    {isEditing && canDeleteSemester && (
                        <button
                            onClick={removeSemester}
                            className="ml-2 px-3 py-1 border rounded-lg text-red-500 border-red-500 hover:bg-red-500 hover:text-white transition"
                        >
                            Delete
                        </button>
                    )}
                </div>
            </div>
            <p className="text-sm mb-4">{creditHours} Credit Hours</p>

            {isEditing ? (
                <textarea
                    value={editableNotes}
                    onChange={handleNotesChange}
                    className="w-full p-1 border rounded-md text-gray-700 text-sm"
                    rows={2}
                    placeholder="Enter your notes here"
                />
            ) : (
                <p className="text-sm italic mb-4 text-gray-600">
                    {truncatedNotes}
                    {editableNotes.length > 100 && (
                        <button
                            onClick={() => setShowNoteView(true)}
                            className="text-blue-500 hover:underline ml-2"
                        >
                            View More
                        </button>
                    )}
                </p>
            )}

            <div className="space-y-2 relative">
                {plannedCourses.map((course, index) => (
                    <div key={index} className="relative">
                        <CourseCardComponent
                            course={course}
                            fromSemester={semester}
                        />
                        {isEditing && (
                            <div className="absolute top-2 right-2">
                                <button
                                    onClick={() => removeCourse(course)}
                                    className="bg-red-100 p-1 rounded-full hover:bg-red-200 transition"
                                >
                                    <img
                                        src={removeImg}
                                        alt="Remove"
                                        className="w-4 h-4"
                                    />
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-4 border-t pt-2 text-center text-sm italic text-gray-500">
                Drag and drop courses here
            </div>

            {showNoteView && (
                <NoteCardViewComponent
                    notes={editableNotes}
                    setNotes={setEditableNotes}
                    onClose={() => setShowNoteView(false)}
                />
            )}
        </div>
    );
}

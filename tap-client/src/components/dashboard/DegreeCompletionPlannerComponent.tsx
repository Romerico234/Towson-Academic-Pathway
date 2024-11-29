import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthComponent";
import UserService from "../../shared/services/user.service";
import TokenService from "../../shared/services/token.service";
import SemesterComponent from "./SemesterComponent";
import {
    DndContext,
    DragOverlay,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";

interface DegreePlanItem {
    order: number;
    semester: string;
    plannedCourses: string[];
    creditHours: number;
    notes: string;
}

const semesterSequence = ["Spring", "Summer", "Fall", "Winter"];

function getNextSemesterWithYear(
    current: string,
    direction: "before" | "after"
) {
    const [currentSemester, currentYearString] = current.split(" ");
    const currentYear = parseInt(currentYearString, 10);
    const index = semesterSequence.indexOf(currentSemester);

    if (index === -1) return current;

    let newIndex = direction === "before" ? index - 1 : index + 1;
    let newYear = currentYear;

    if (newIndex < 0) {
        newIndex = semesterSequence.length - 1; // Wrap around to the last semester
        newYear -= 1; // Move to the previous year
    } else if (newIndex >= semesterSequence.length) {
        newIndex = 0; // Wrap around to the first semester
        newYear += 1; // Move to the next year
    }

    return `${semesterSequence[newIndex]} ${newYear}`;
}

export default function DegreeCompletionPlannerComponent() {
    const { token } = useAuth();
    const [degreePlan, setDegreePlan] = useState<DegreePlanItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCourse, setActiveCourse] = useState<string | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        })
    );

    useEffect(() => {
        const fetchDegreePlan = async () => {
            if (!token) return;

            try {
                const tokenService = new TokenService();
                const userId = await tokenService.getUserIdFromToken(token);

                if (!userId) {
                    throw new Error("Failed to retrieve userId from token.");
                }

                const userService = new UserService();
                const fetchedDegreePlan = await userService.getDegreePlanById(
                    userId
                );

                setDegreePlan(
                    fetchedDegreePlan.map((item: any, index: number) => ({
                        order: index,
                        ...item,
                    })) || []
                );
            } catch (error) {
                console.error("Error fetching degree plan:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDegreePlan();
    }, [token]);

    const updateDegreePlanInBackend = async (updatedPlan: DegreePlanItem[]) => {
        if (!token) return;

        try {
            const tokenService = new TokenService();
            const userId = await tokenService.getUserIdFromToken(token);

            if (!userId) {
                throw new Error("Failed to retrieve userId from token.");
            }

            const userService = new UserService();
            await userService.updateUserById(userId, {
                degreePlan: updatedPlan,
            });
        } catch (error) {
            console.error("Error updating degree plan in backend:", error);
        }
    };

    const removeSemester = (semesterToRemove: string) => {
        setDegreePlan((prevPlan) => {
            const updatedPlan = prevPlan.filter(
                (semester) => semester.semester !== semesterToRemove
            );
            updateDegreePlanInBackend(updatedPlan);
            return updatedPlan;
        });
    };

    const addSemesterBefore = () => {
        setDegreePlan((prevPlan) => {
            const firstSemester = prevPlan[0];
            const newSemesterName = getNextSemesterWithYear(
                firstSemester.semester,
                "before"
            );
            const newSemester = {
                order: firstSemester.order - 1,
                semester: newSemesterName,
                plannedCourses: [],
                creditHours: 0,
                notes: "",
            };
            const updatedPlan = [newSemester, ...prevPlan];
            updateDegreePlanInBackend(updatedPlan);
            return updatedPlan;
        });
    };

    const addSemesterAfter = () => {
        setDegreePlan((prevPlan) => {
            const lastSemester = prevPlan[prevPlan.length - 1];
            const newSemesterName = getNextSemesterWithYear(
                lastSemester.semester,
                "after"
            );
            const newSemester = {
                order: lastSemester.order + 1,
                semester: newSemesterName,
                plannedCourses: [],
                creditHours: 0,
                notes: "",
            };
            const updatedPlan = [...prevPlan, newSemester];
            updateDegreePlanInBackend(updatedPlan);
            return updatedPlan;
        });
    };

    const handleDragStart = (event: any) => {
        const { active } = event;
        setActiveCourse(active.id);
    };

    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        setActiveCourse(null);

        if (active && over) {
            const course = active.data.current.course;
            const fromSemesterId = active.data.current.fromSemester;
            const toSemesterId = over.id;

            if (active.data.current.type === "course") {
                setDegreePlan((prevPlan) => {
                    let updatedPlan = prevPlan.map((semester) => {
                        // Remove course from original semester
                        if (semester.semester === fromSemesterId) {
                            return {
                                ...semester,
                                plannedCourses: semester.plannedCourses.filter(
                                    (c) => c !== course
                                ),
                            };
                        }
                        return semester;
                    });

                    // Add course to new semester if it doesn't already exist
                    updatedPlan = updatedPlan.map((semester) => {
                        if (semester.semester === toSemesterId) {
                            if (!semester.plannedCourses.includes(course)) {
                                return {
                                    ...semester,
                                    plannedCourses: [
                                        ...semester.plannedCourses,
                                        course,
                                    ],
                                };
                            }
                        }
                        return semester;
                    });

                    updateDegreePlanInBackend(updatedPlan);
                    return updatedPlan;
                });
            }
        }
    };

    const sortedDegreePlan = [...degreePlan].sort((a, b) => a.order - b.order);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p>Loading Degree Plan...</p>
            </div>
        );
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <div className="p-4">
                <div className="flex justify-between mb-4">
                    <button
                        onClick={addSemesterBefore}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                    >
                        Add Semester Before
                    </button>
                    <button
                        onClick={addSemesterAfter}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                    >
                        Add Semester After
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sortedDegreePlan.map((semesterData, index) => {
                        const isFirstSemester = index === 0;
                        const isLastSemester =
                            index === sortedDegreePlan.length - 1;
                        const canDeleteSemester =
                            isFirstSemester || isLastSemester;

                        return (
                            <SemesterComponent
                                key={semesterData.semester}
                                semester={semesterData.semester}
                                plannedCourses={semesterData.plannedCourses}
                                creditHours={semesterData.creditHours}
                                notes={semesterData.notes}
                                removeCourse={(course) =>
                                    setDegreePlan((prevPlan) => {
                                        const updatedPlan = prevPlan.map(
                                            (semester) =>
                                                semester.semester ===
                                                semesterData.semester
                                                    ? {
                                                          ...semester,
                                                          plannedCourses:
                                                              semester.plannedCourses.filter(
                                                                  (c) =>
                                                                      c !==
                                                                      course
                                                              ),
                                                      }
                                                    : semester
                                        );
                                        updateDegreePlanInBackend(updatedPlan);
                                        return updatedPlan;
                                    })
                                }
                                removeSemester={() =>
                                    removeSemester(semesterData.semester)
                                }
                                canDeleteSemester={canDeleteSemester} // Pass the prop
                            />
                        );
                    })}
                </div>
            </div>
            <DragOverlay>
                {activeCourse ? (
                    <div className="p-4 border rounded shadow bg-white">
                        <p>{activeCourse.split("-")[1]}</p>{" "}
                        {/* Extract course name */}
                    </div>
                ) : null}
            </DragOverlay>
        </DndContext>
    );
}

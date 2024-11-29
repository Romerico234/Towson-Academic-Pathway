import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthComponent";
import UserService from "../../shared/services/user.service";
import TokenService from "../../shared/services/token.service";
import CourseService from "../../shared/services/course.service";
import SemesterComponent from "./SemesterComponent";
import CourseCatalogComponent from "./CourseCatalogComponent";
import {
    DndContext,
    DragOverlay,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";

interface Course {
    subject: string;
    catalogNumber: string;
    title: string;
    units: string;
    termsOffered?: string[];
}

interface DegreePlanItem {
    order: number;
    semester: string;
    plannedCourses: Course[]; // Changed from string[] to Course[]
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
        newIndex = semesterSequence.length - 1;
        newYear -= 1;
    } else if (newIndex >= semesterSequence.length) {
        newIndex = 0;
        newYear += 1;
    }

    return `${semesterSequence[newIndex]} ${newYear}`;
}

export default function DegreeCompletionPlannerComponent() {
    const { token } = useAuth();
    const [degreePlan, setDegreePlan] = useState<DegreePlanItem[]>([]);
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCourse, setActiveCourse] = useState<Course | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        })
    );

    useEffect(() => {
        const fetchData = async () => {
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

                const courseService = new CourseService();
                const allCourses = await courseService.getAllCourses();

                // Convert plannedCourses strings into Course objects
                const updatedDegreePlan: DegreePlanItem[] = await Promise.all(
                    fetchedDegreePlan.map(
                        async (semesterItem: any, index: number) => {
                            const plannedCourses: Course[] = await Promise.all(
                                semesterItem.plannedCourses.map(
                                    async (courseString: string) => {
                                        // Extract subject and catalogNumber
                                        const [subjectCatalog, ...rest] =
                                            courseString.split(" - ");

                                        const subjectCodeMatch =
                                            subjectCatalog.match(/^[A-Za-z]+/);
                                        if (!subjectCodeMatch) {
                                            throw new Error(
                                                `Invalid subject code in course string: ${courseString}`
                                            );
                                        }
                                        const subject = subjectCodeMatch[0];

                                        const catalogNumberSubstring =
                                            subjectCatalog.substring(
                                                subject.length
                                            );
                                        const catalogNumberMatch =
                                            catalogNumberSubstring.match(
                                                /^[A-Za-z0-9]+/
                                            );
                                        if (!catalogNumberMatch) {
                                            throw new Error(
                                                `Invalid catalog number in course string: ${courseString}`
                                            );
                                        }
                                        const catalogNumber =
                                            catalogNumberMatch[0];

                                        // Fetch course details
                                        const courseData =
                                            await courseService.getCourseBySubjectAndCatalogNumber(
                                                subject,
                                                catalogNumber
                                            );

                                        return {
                                            subject: courseData.subject,
                                            catalogNumber:
                                                courseData.catalogNumber,
                                            title: courseData.courseTitle,
                                            units: courseData.units,
                                        };
                                    }
                                )
                            );

                            return {
                                order: index,
                                semester: semesterItem.semester,
                                plannedCourses,
                                creditHours: semesterItem.creditHours,
                                notes: semesterItem.notes,
                            };
                        }
                    )
                );

                // Remove courses already in the degree plan from the catalog
                const plannedCourseIds = new Set(
                    updatedDegreePlan.flatMap((semester) =>
                        semester.plannedCourses.map(
                            (course: Course) =>
                                `${course.subject}-${course.catalogNumber}`
                        )
                    )
                );

                // Filter available courses to exclude those in the degree plan
                const availableCourses = allCourses.filter(
                    (course: any) =>
                        !plannedCourseIds.has(
                            `${course.subject}-${course.catalogNumber}`
                        )
                );

                // Map available courses to match the Course interface
                const mappedAvailableCourses: Course[] = availableCourses.map(
                    (course: any) => ({
                        subject: course.subject,
                        catalogNumber: course.catalogNumber,
                        title: course.courseTitle,
                        units: course.units,
                        termsOffered: course.termsOffered,
                    })
                );

                setDegreePlan(updatedDegreePlan);
                setCourses(mappedAvailableCourses);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
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

            // Convert plannedCourses back to strings for storage
            const planToStore = updatedPlan.map((semester) => ({
                ...semester,
                plannedCourses: semester.plannedCourses.map(
                    (course) =>
                        `${course.subject}${course.catalogNumber} - ${course.title} (${course.units} units)`
                ),
            }));

            await userService.updateUserById(userId, {
                degreePlan: planToStore,
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
            const newSemester: DegreePlanItem = {
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
            const newSemester: DegreePlanItem = {
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
        setActiveCourse(active.data.current.course);
    };

    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        setActiveCourse(null);

        if (active && over) {
            const course: Course = active.data.current.course;
            const fromSemesterId = active.data.current.fromSemester;
            const toId = over.id;

            if (active.data.current.type === "course") {
                if (fromSemesterId && toId !== "course-catalog") {
                    // Dragging from one semester to another
                    if (fromSemesterId !== toId) {
                        setDegreePlan((prevPlan) => {
                            let updatedPlan = prevPlan.map((semester) => {
                                if (semester.semester === fromSemesterId) {
                                    return {
                                        ...semester,
                                        plannedCourses:
                                            semester.plannedCourses.filter(
                                                (c) =>
                                                    c.subject !==
                                                        course.subject ||
                                                    c.catalogNumber !==
                                                        course.catalogNumber
                                            ),
                                    };
                                }
                                return semester;
                            });

                            updatedPlan = updatedPlan.map((semester) => {
                                if (semester.semester === toId) {
                                    const courseExists =
                                        semester.plannedCourses.some(
                                            (c) =>
                                                c.subject === course.subject &&
                                                c.catalogNumber ===
                                                    course.catalogNumber
                                        );
                                    if (!courseExists) {
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
                } else if (!fromSemesterId && toId !== "course-catalog") {
                    // Dragging from catalog to semester
                    setDegreePlan((prevPlan) => {
                        const updatedPlan = prevPlan.map((semester) => {
                            if (semester.semester === toId) {
                                const courseExists =
                                    semester.plannedCourses.some(
                                        (c) =>
                                            c.subject === course.subject &&
                                            c.catalogNumber ===
                                                course.catalogNumber
                                    );
                                if (!courseExists) {
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
                // No need to handle dragging from semester back to catalog
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
            <div className="flex">
                {/* Course Catalog */}
                <div className="w-1/4 p-4 bg-gray-100">
                    {/* Course Catalog Title */}
                    <h2 className="text-2xl font-bold text-black mb-4 text-left">
                        Course Catalog
                    </h2>

                    <CourseCatalogComponent courses={courses} />
                </div>

                {/* Degree Planner */}
                <div className="flex-1 p-4">
                    <div className="flex justify-between mb-4">
                        <button
                            onClick={addSemesterBefore}
                            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                        >
                            Add Semester Before
                        </button>
                        <button
                            onClick={addSemesterAfter}
                            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                        >
                            Add Semester After
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {sortedDegreePlan.map((semesterData, index) => (
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
                                                                      c.subject !==
                                                                          course.subject ||
                                                                      c.catalogNumber !==
                                                                          course.catalogNumber
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
                                canDeleteSemester={
                                    index === 0 ||
                                    index === sortedDegreePlan.length - 1
                                }
                            />
                        ))}
                    </div>
                </div>
            </div>
            <DragOverlay>
                {activeCourse ? (
                    <div className="p-4 border rounded shadow bg-white">
                        <p>
                            {activeCourse.subject} {activeCourse.catalogNumber}{" "}
                            - {activeCourse.title}
                        </p>
                    </div>
                ) : null}
            </DragOverlay>
        </DndContext>
    );
}

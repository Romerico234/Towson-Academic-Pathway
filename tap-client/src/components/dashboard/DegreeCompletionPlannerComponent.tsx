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
import Lottie from "lottie-react";
import loadingAnimation from "../../assets/lottie-assets/loading.json";

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
    plannedCourses: Course[];
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

function getCurrentSemesterWithYear() {
    const date = new Date();
    const month = date.getMonth(); // Months are zero-based in JavaScript
    const year = date.getFullYear();

    let semester = "";
    if (month >= 0 && month <= 1) {
        // January (0) and February (1)
        semester = "Winter";
    } else if (month >= 2 && month <= 4) {
        // March (2) to May (4)
        semester = "Spring";
    } else if (month >= 5 && month <= 7) {
        // June (5) to August (7)
        semester = "Summer";
    } else if (month >= 8 && month <= 11) {
        // September (8) to December (11)
        semester = "Fall";
    }
    return `${semester} ${year}`;
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

                // Map all courses without filtering
                const mappedAvailableCourses: Course[] = allCourses.map(
                    (course: any) => ({
                        subject: course.subject,
                        catalogNumber: course.catalogNumber,
                        title: course.courseTitle,
                        units: course.units,
                        termsOffered: course.termsOffered,
                    })
                );

                setCourses(mappedAvailableCourses);

                // Convert plannedCourses strings into Course objects
                const updatedDegreePlan: DegreePlanItem[] = await Promise.all(
                    fetchedDegreePlan.map(
                        async (semesterItem: any, index: number) => {
                            const plannedCourses: Course[] = await Promise.all(
                                semesterItem.plannedCourses.map(
                                    async (courseString: string) => {
                                        try {
                                            // Attempt to fetch from backend
                                            const [subjectCatalog] =
                                                courseString.split(" - ");

                                            const subjectCodeMatch =
                                                subjectCatalog.match(
                                                    /^[A-Za-z]+/
                                                );
                                            const subject = subjectCodeMatch
                                                ? subjectCodeMatch[0]
                                                : "Unknown";

                                            const catalogNumberSubstring =
                                                subjectCatalog
                                                    .substring(subject.length)
                                                    .trim();
                                            const catalogNumberMatch =
                                                catalogNumberSubstring.match(
                                                    /^[A-Za-z0-9]+/
                                                );
                                            const catalogNumber =
                                                catalogNumberMatch
                                                    ? catalogNumberMatch[0]
                                                    : "Unknown";

                                            const courseData =
                                                await courseService.getCourseBySubjectAndCatalogNumber(
                                                    subject,
                                                    catalogNumber
                                                );

                                            return {
                                                subject:
                                                    courseData.subject ||
                                                    subject,
                                                catalogNumber:
                                                    courseData.catalogNumber ||
                                                    catalogNumber,
                                                title:
                                                    courseData.courseTitle ||
                                                    "No title available",
                                                units:
                                                    courseData.units ||
                                                    "No units available",
                                            };
                                        } catch (error) {
                                            console.error(
                                                `Error fetching course data for: ${courseString}`,
                                                error
                                            );

                                            // Parse courseString as fallback
                                            const fallbackParsedCourse =
                                                parseCourseString(courseString);
                                            return fallbackParsedCourse;
                                        }
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

                setDegreePlan(updatedDegreePlan);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [token]);

    function parseCourseString(courseString: string): Course {
        const [subjectCatalog, ...rest] = courseString.split(" - ");

        // Extract subject
        const subjectCodeMatch = subjectCatalog.match(/^[A-Za-z]+/);
        const subject = subjectCodeMatch ? subjectCodeMatch[0] : "Unknown";

        // Extract catalog number
        const catalogNumberSubstring = subjectCatalog
            .substring(subject.length)
            .trim();
        const catalogNumberMatch =
            catalogNumberSubstring.match(/^[A-Za-z0-9]+/);
        const catalogNumber = catalogNumberMatch
            ? catalogNumberMatch[0]
            : "Unknown";

        // Extract title and units
        const titleAndUnits = rest.join(" - ").trim();
        const titleMatch = titleAndUnits.match(/^(.+?)\s*\((\d+)\s*units\)$/i);
        const title = titleMatch ? titleMatch[1] : titleAndUnits;
        const units = titleMatch ? titleMatch[2] : "0";

        return {
            subject,
            catalogNumber,
            title,
            units,
        };
    }

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
                creditHours: semester.creditHours,
                notes: semester.notes,
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
            if (prevPlan.length === 0) {
                // Degree plan is empty, create a semester based on current date
                const newSemesterName = getCurrentSemesterWithYear();
                const newSemester: DegreePlanItem = {
                    order: 0,
                    semester: newSemesterName,
                    plannedCourses: [],
                    creditHours: 0,
                    notes: "",
                };
                const updatedPlan = [newSemester];
                updateDegreePlanInBackend(updatedPlan);
                return updatedPlan;
            } else {
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
            }
        });
    };

    const addSemesterAfter = () => {
        setDegreePlan((prevPlan) => {
            if (prevPlan.length === 0) {
                // Degree plan is empty, create a semester based on current date
                const newSemesterName = getCurrentSemesterWithYear();
                const newSemester: DegreePlanItem = {
                    order: 0,
                    semester: newSemesterName,
                    plannedCourses: [],
                    creditHours: 0,
                    notes: "",
                };
                const updatedPlan = [newSemester];
                updateDegreePlanInBackend(updatedPlan);
                return updatedPlan;
            } else {
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
            }
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
                if (
                    fromSemesterId &&
                    fromSemesterId !== toId &&
                    toId !== "course-catalog"
                ) {
                    // Moving course from one semester to another
                    setDegreePlan((prevPlan) => {
                        let updatedPlan = prevPlan.map((semester) => {
                            if (semester.semester === fromSemesterId) {
                                return {
                                    ...semester,
                                    plannedCourses:
                                        semester.plannedCourses.filter(
                                            (c) =>
                                                c.subject !== course.subject ||
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
                } else if (fromSemesterId && toId === "course-catalog") {
                    // Removing course from semester back to course catalog
                    setDegreePlan((prevPlan) => {
                        const updatedPlan = prevPlan.map((semester) => {
                            if (semester.semester === fromSemesterId) {
                                return {
                                    ...semester,
                                    plannedCourses:
                                        semester.plannedCourses.filter(
                                            (c) =>
                                                c.subject !== course.subject ||
                                                c.catalogNumber !==
                                                    course.catalogNumber
                                        ),
                                };
                            }
                            return semester;
                        });
                        updateDegreePlanInBackend(updatedPlan);
                        return updatedPlan;
                    });
                } else if (!fromSemesterId && toId !== "course-catalog") {
                    // Adding course from catalog to semester
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
                // Do nothing if dragging within the same semester
            }
        }
    };

    const updateSemesterNotes = (semesterName: string, newNotes: string) => {
        setDegreePlan((prevPlan) => {
            const updatedPlan = prevPlan.map((semester) => {
                if (semester.semester === semesterName) {
                    return {
                        ...semester,
                        notes: newNotes,
                    };
                }
                return semester;
            });
            updateDegreePlanInBackend(updatedPlan);
            return updatedPlan;
        });
    };

    const sortedDegreePlan = [...degreePlan].sort((a, b) => a.order - b.order);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Lottie
                    animationData={loadingAnimation}
                    loop={true} // Set looping
                    autoplay={true} // Set autoplay
                    height={150}
                    width={150} 
                />
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
                                updateNotes={(newNotes) =>
                                    updateSemesterNotes(
                                        semesterData.semester,
                                        newNotes
                                    )
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

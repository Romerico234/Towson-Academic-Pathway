import { useDroppable } from "@dnd-kit/core";
import { useState } from "react";
import CourseCardComponent from "./CourseCardComponent";

interface Course {
    subject: string;
    catalogNumber: string;
    title: string;
    units: string; 
    termsOffered?: string[];
  }
  

interface CourseCatalogProps {
    courses?: Course[]; // Optional for undefined scenarios
}

export default function CourseCatalogComponent({
    courses = [],
}: CourseCatalogProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [filterSubject, setFilterSubject] = useState("");
    const [filterTermOffered, setFilterTermOffered] = useState("");
    const [filterUnits, setFilterUnits] = useState<string | null>(null); 
    const [showFilters, setShowFilters] = useState(false);

    const { isOver, setNodeRef } = useDroppable({
        id: "course-catalog",
        data: {
            type: "catalog",
        },
    });

    const style = {
        backgroundColor: isOver ? "lightblue" : undefined,
    };

    // Apply search and filters
    const filteredCourses = courses
        .filter((course) => {
            const query = searchQuery.toLowerCase();

            // Match search query
            const matchesQuery =
                course.subject.toLowerCase().includes(query) ||
                course.catalogNumber.toLowerCase().includes(query) ||
                course.title.toLowerCase().includes(query);

            // Match subject filter
            const matchesSubject = filterSubject
                ? course.subject.toLowerCase() === filterSubject.toLowerCase()
                : true;

            // Match term offered filter
            const matchesTerm = filterTermOffered
                ? course.termsOffered?.some((term) =>
                      term
                          .toLowerCase()
                          .includes(filterTermOffered.toLowerCase())
                  )
                : true;

            // Match units filter
            const matchesUnits = (() => {
                if (!filterUnits) return true; // No filter applied
              
                if (filterUnits.includes("-")) {
                  // Handle range-based filter (e.g., "1-3")
                  const [min, max] = filterUnits.split("-").map(Number);
                  const courseUnits = Number(course.units);
                  return courseUnits >= min && courseUnits <= max;
                }
              
                // Handle exact match filter
                return course.units === filterUnits;
              })();
            return (
                matchesQuery && matchesSubject && matchesTerm && matchesUnits
            );
        })
        .sort((a, b) => {
            if (a.subject < b.subject) return -1;
            if (a.subject > b.subject) return 1;
            return a.catalogNumber.localeCompare(b.catalogNumber, undefined, {
                numeric: true,
            });
        });

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="h-full flex flex-col bg-gray-100"
        >
            {/* Search Bar */}
            <div className="p-4 bg-towsonGold flex justify-between items-center">
                <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-2 border rounded shadow-sm"
                />
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="ml-4 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
                >
                    {showFilters ? "Hide Filters" : "Filter Options"}
                </button>
            </div>

            {/* Filter Dropdown */}
            {showFilters && (
                <div className="p-4 bg-white shadow">
                    <div className="mb-4">
                        <label className="block mb-1 font-semibold">
                            Subject
                        </label>
                        <select
                            value={filterSubject}
                            onChange={(e) => setFilterSubject(e.target.value)}
                            className="w-full p-2 border rounded"
                        >
                            <option value="">All Subjects</option>
                            {Array.from(
                                new Set(courses.map((c) => c.subject))
                            ).map((subject) => (
                                <option key={subject} value={subject}>
                                    {subject}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 font-semibold">
                            Term Offered
                        </label>
                        <select
                            value={filterTermOffered}
                            onChange={(e) =>
                                setFilterTermOffered(e.target.value)
                            }
                            className="w-full p-2 border rounded"
                        >
                            <option value="">All Terms</option>
                            <option value="Fall">Fall</option>
                            <option value="Spring">Spring</option>
                            <option value="Summer">Summer</option>
                            <option value="Winter">Winter</option>
                        </select>
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">
                            Units
                        </label>
                        <select
                            value={filterUnits || ""}
                            onChange={(e) =>
                                setFilterUnits(
                                    e.target.value ? e.target.value : null
                                )
                            }
                            className="w-full p-2 border rounded"
                        >
                            <option value="">All Units</option>
                            <option value="1">1 unit</option>
                            <option value="2">2 units</option>
                            <option value="3">3 units</option>
                            <option value="4">4 units</option>
                            <option value="5">5 units</option>
                            <option value="6">6 units</option>
                            <option value="1-3">1-3 units</option>
                            <option value="4-6">4-6 units</option>
                        </select>
                    </div>
                </div>
            )}

            {/* Course Cards */}
            <div className="flex-1 overflow-auto p-4">
                <div className="space-y-4">
                    {filteredCourses.map((course, index) => (
                        <CourseCardComponent key={index} course={course} />
                    ))}
                </div>
            </div>
        </div>
    );
}

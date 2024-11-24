import { useEffect, useState } from "react";
import CourseService from "../shared/services/course.service";

export default function CourseTestComponent() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const courseService = new CourseService();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const courses = await courseService.getAllCourses();
                setData(courses);
            } catch (error) {
                console.error("Error fetching courses:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Course Test Component</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}

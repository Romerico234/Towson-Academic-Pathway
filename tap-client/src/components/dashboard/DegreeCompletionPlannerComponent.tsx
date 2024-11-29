import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthComponent";
import UserService from "../../shared/services/user.service";
import SemesterComponent from "./SemesterComponent";

interface DegreePlanItem {
    semester: string;
    plannedCourses: string[];
    creditHours: number;
    notes: string;
}

export default function DegreeCompletionPlannerComponent() {
    const { token, userId } = useAuth();
    const [degreePlan, setDegreePlan] = useState<DegreePlanItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDegreePlan = async () => {
            if (!token || !userId) return;

            try {
                const userService = new UserService();
                const response = await userService.getDegreePlanById(userId);

                console.log(
                    "Fetched Degree Plan from Database:",
                    response.degreePlan
                );
                setDegreePlan(response.degreePlan || []);
            } catch (error) {
                console.error("Error fetching degree plan:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDegreePlan();
    }, [token, userId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p>Loading Degree Plan...</p>
            </div>
        );
    }

    console.log("Rendering Degree Plan:", degreePlan);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {degreePlan.map((semesterData, index) => (
                <SemesterComponent
                    key={index}
                    semester={semesterData.semester}
                    plannedCourses={semesterData.plannedCourses}
                    creditHours={semesterData.creditHours}
                    notes={semesterData.notes}
                />
            ))}
        </div>
    );
}

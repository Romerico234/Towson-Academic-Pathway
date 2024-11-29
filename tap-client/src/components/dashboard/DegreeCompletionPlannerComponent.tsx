import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthComponent";
import UserService from "../../shared/services/user.service";
import TokenService from "../../shared/services/token.service";
import SemesterComponent from "./SemesterComponent";

interface DegreePlanItem {
    semester: string;
    plannedCourses: string[];
    creditHours: number;
    notes: string;
}

export default function DegreeCompletionPlannerComponent() {
    const { token } = useAuth();
    const [degreePlan, setDegreePlan] = useState<DegreePlanItem[]>([]);
    const [loading, setLoading] = useState(true);

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
                const degreePlan = await userService.getDegreePlanById(userId);

                setDegreePlan(degreePlan || []);
            } catch (error) {
                console.error("Error fetching degree plan:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDegreePlan();
    }, [token]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p>Loading Degree Plan...</p>
            </div>
        );
    }

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

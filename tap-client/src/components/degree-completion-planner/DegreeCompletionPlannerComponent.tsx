import { useEffect, useState } from "react";
import CourseService from "../../shared/services/course.service";
import SemesterComponent from "./SemesterComponent";
import CourseDetailsModal from "./CourseDetailsModal";
import DegreePlanNavigator from "./DegreePlanNavigator";
import UserService from "../../shared/services/user.service";

export default function DegreeCompletionPlannerComponent() {
    const courseService = new CourseService();
    const userService = new UserService();

    const [userEmail, setUserEmail] = useState<string>("");
    const [degreePlans, setDegreePlans] = useState<any[]>([]);
    const [currentPlanIndex, setCurrentPlanIndex] = useState(0);
    const [currentPlan, setCurrentPlan] = useState<any>(null);
    const [selectedCourse, setSelectedCourse] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [favoritePlans, setFavoritePlans] = useState<string[]>([]);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const user = await userService.getUserProfile();
                setUserEmail(user.email);
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };

        fetchUserProfile();
    }, []);

    useEffect(() => {
        if (!userEmail) return;

        const fetchDegreePlans = async () => {
            try {
                const plans = await userService.getDegreePlansByEmail(
                    userEmail
                );
                setDegreePlans(plans);
                setCurrentPlan(plans[0]);
            } catch (error) {
                console.error("Error fetching degree plans:", error);
            }
        };

        const fetchFavorites = async () => {
            try {
                const favorites =
                    await userService.getFavoriteDegreePlansByEmail(userEmail);
                const favoriteNames = favorites.map((fav: any) => fav.name);
                setFavoritePlans(favoriteNames);
            } catch (error) {
                console.error("Error fetching favorite degree plans:", error);
            }
        };

        fetchDegreePlans();
        fetchFavorites();
    }, [userEmail]);

    const handleCourseClick = async (courseInfo: any) => {
        try {
            const course =
                await courseService.getCourseBySubjectAndCatalogNumber(
                    courseInfo.subject,
                    courseInfo.catalogNumber
                );
            setSelectedCourse(course);
            setIsModalOpen(true);
        } catch (error) {
            console.error("Error fetching course details:", error);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedCourse(null);
    };

    const handlePreviousPlan = () => {
        if (currentPlanIndex > 0) {
            setCurrentPlanIndex(currentPlanIndex - 1);
            setCurrentPlan(degreePlans[currentPlanIndex - 1]);
        }
    };

    const handleNextPlan = () => {
        if (currentPlanIndex < degreePlans.length - 1) {
            setCurrentPlanIndex(currentPlanIndex + 1);
            setCurrentPlan(degreePlans[currentPlanIndex + 1]);
        }
    };

    const handleFavoriteToggle = async () => {
        const planName = `Degree Plan ${currentPlanIndex + 1}`;

        if (favoritePlans.includes(planName)) {
            // Unfavorite the plan
            try {
                await userService.removeFavoriteDegreePlan(userEmail, planName);
                setFavoritePlans(
                    favoritePlans.filter((name) => name !== planName)
                );
            } catch (error) {
                console.error("Error unfavoriting degree plan:", error);
            }
        } else {
            // Favorite the plan
            try {
                const favoriteData = {
                    name: planName,
                    degreePlan: currentPlan,
                };
                await userService.addFavoriteDegreePlan(
                    userEmail,
                    favoriteData
                );
                setFavoritePlans([...favoritePlans, planName]);
            } catch (error) {
                console.error("Error favoriting degree plan:", error);
            }
        }
    };

    if (!currentPlan) {
        return <div>Loading degree plans...</div>;
    }

    const isFavorited = favoritePlans.includes(
        `Degree Plan ${currentPlanIndex + 1}`
    );

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">
                Degree Completion Planner
            </h1>

            <DegreePlanNavigator
                currentPlanIndex={currentPlanIndex}
                totalPlans={degreePlans.length}
                onPrevious={handlePreviousPlan}
                onNext={handleNextPlan}
                onFavorite={handleFavoriteToggle}
                isFavorited={isFavorited}
            />

            {currentPlan.map((semester: any, index: number) => (
                <SemesterComponent
                    key={index}
                    semester={semester}
                    onCourseClick={handleCourseClick}
                />
            ))}

            <CourseDetailsModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                course={selectedCourse}
            />
        </div>
    );
}

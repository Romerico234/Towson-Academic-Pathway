import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IAcademicInfo } from "./interfaces/IAcademicInfo";
import { IPreferencesInfo } from "./interfaces/IPreferencesInfo";
import { IFormDataType } from "./interfaces/IFormDataType";
import AcademicInfoFormComponent from "./AcademicInfoFormComponent";
import PreferencesInfoFormComponent from "./PreferencesInfoFormComponent";
import OpenAIService from "../../shared/services/openai.service";
import UserService from "../../shared/services/user.service";
import TokenService from "../../shared/services/token.service";
import { useAuth } from "../auth/AuthComponent";
import Lottie from "lottie-react";
import loadingAnimation from "../../assets/lottie-assets/loading.json";

export default function MainFormComponent() {
    const { token } = useAuth();
    const navigate = useNavigate();

    const [academicInfo, setPersonalInfo] = useState<IAcademicInfo>({
        major: "",
        concentration: "",
        bachelorsDegree: "",
        unofficialTranscript: null,
        startDateSemester: "",
        startDateYear: new Date().getFullYear(),
        expectedGraduationSemester: "",
        expectedGraduationYear: new Date().getFullYear(),
        isHonorsStudent: false,
    });

    const [preferencesInfo, setPreferences] = useState<IPreferencesInfo>({
        preferredCreditHours: "",
        summerWinterCoursesFrequency: "",
        unavailableTerms: [],
        additionalComments: "",
    });

    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            if (token) {
                try {
                    const tokenService = new TokenService();
                    const userId = await tokenService.getUserIdFromToken(token);
                    setUserId(userId);

                    if (userId) {
                        const userService = new UserService();
                        const userData = await userService.getUserById(userId);

                        setPersonalInfo((prevState) => ({
                            ...prevState,
                            firstName: userData.firstName || "",
                            lastName: userData.lastName || "",
                            email: userData.email || "",
                        }));
                    } else {
                        console.error("User ID is missing.");
                        throw new Error("User ID is missing.");
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
        };

        fetchUserData();
    }, [token]);

    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = e.target;

        if (name === "unofficialTranscript") {
            setPersonalInfo({
                ...academicInfo,
                unofficialTranscript: (e.target as HTMLInputElement).files
                    ? (e.target as HTMLInputElement).files![0]
                    : null,
            });
        } else if (name === "isHonorsStudent") {
            setPersonalInfo({
                ...academicInfo,
                [name]: value === "true",
            });
        } else if (Object.keys(academicInfo).includes(name)) {
            setPersonalInfo({
                ...academicInfo,
                [name]: value,
            });
        } else {
            setPreferences({
                ...preferencesInfo,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const formData: IFormDataType = { ...academicInfo, ...preferencesInfo };

        const dataToSend = new FormData();
        for (const key in formData) {
            if (key === "unofficialTranscript") {
                if (academicInfo.unofficialTranscript) {
                    dataToSend.append(
                        "unofficialTranscript",
                        academicInfo.unofficialTranscript
                    );
                }
            } else if (key === "unavailableTerms") {
                dataToSend.append(
                    key,
                    JSON.stringify(preferencesInfo.unavailableTerms)
                );
            } else if (key === "isHonorsStudent") {
                dataToSend.append(key, String(formData.isHonorsStudent));
            } else {
                dataToSend.append(key, (formData as any)[key]);
            }
        }

        try {
            if (!token || !userId) {
                console.error("Token or UserId is missing.");
                throw new Error("Token or UserId is missing.");
            }

            const userService = new UserService();

            await userService.updateUserById(userId, {
                academicInfo: academicInfo, 
                preferencesInfo: preferencesInfo,
            });

            const openAIService = new OpenAIService();
            const response = await openAIService.generatePlan(dataToSend);

            // Clear the degreePlan
            await userService.updateUserById(userId, { degreePlan: [] });

            // Push new degreePlan
            await userService.updateUserById(userId, {
                $push: { degreePlan: response },
            });

            navigate("/dashboard");
        } catch (error) {
            console.error("Error generating or saving degree plan:", error);
            alert(
                "There was an error processing your request. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            {loading ? (
                <div className="flex justify-center items-center min-h-screen">
                    <Lottie
                        animationData={loadingAnimation}
                        loop={true} // Set looping
                        autoplay={true} // Set autoplay
                        height={150}
                        width={150} 
                    />
                </div>
            ) : (
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    {/* Personal Information Component */}
                    <AcademicInfoFormComponent
                        formData={academicInfo}
                        handleInputChange={handleInputChange}
                        isReadOnly={true}
                    />

                    {/* Preferences Information Component */}
                    <PreferencesInfoFormComponent
                        formData={preferencesInfo}
                        handleInputChange={handleInputChange}
                    />

                    {/* Submit Button */}
                    <div className="flex justify-center mt-6">
                        <button
                            type="submit"
                            className="bg-towsonGoldDark text-white font-semibold py-2 px-4 rounded flex items-center hover:bg-towsonGold"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}

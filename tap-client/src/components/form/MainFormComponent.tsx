import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IPersonalInfo } from "./interfaces/IPersonalInfo";
import { IPreferencesInfo } from "./interfaces/IPreferencesInfo";
import { IFormDataType } from "./interfaces/IFormDataType";
import PersonalInfoFormComponent from "./PersonalInfoFormComponent";
import PreferencesInfoFormComponent from "./PreferencesInfoFormComponent";
import OpenAIService from "../../shared/services/openai.service";
import UserService from "../../shared/services/user.service";
import TokenService from "../../shared/services/token.service";
import { useAuth } from "../auth/AuthComponent";

export default function MainFormComponent() {
    const { token } = useAuth();
    const navigate = useNavigate();

    const [personalInfo, setPersonalInfo] = useState<IPersonalInfo>({
        firstName: "",
        lastName: "",
        email: "",
        major: "",
        concentration: "",
        bachelorsDegree: "",
        unofficialTranscript: null,
        expectedGraduationSemester: "Spring",
        expectedGraduationYear: new Date().getFullYear(),
    });

    const [preferences, setPreferences] = useState<IPreferencesInfo>({
        preferredCreditHours: "10-12",
        allowSummerWinter: false,
        generalEducationCompleted: false,
        unavailableTerms: [],
        additionalComments: "",
    });

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
        const { name, value, type } = e.target;
        if (type === "checkbox") {
            setPreferences({
                ...preferences,
                [name]: (e.target as HTMLInputElement).checked,
            });
        } else if (name === "unofficialTranscript") {
            setPersonalInfo({
                ...personalInfo,
                unofficialTranscript: (e.target as HTMLInputElement).files
                    ? (e.target as HTMLInputElement).files![0]
                    : null,
            });
        } else if (Object.keys(personalInfo).includes(name)) {
            setPersonalInfo({
                ...personalInfo,
                [name]: value,
            });
        } else {
            setPreferences({
                ...preferences,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData: IFormDataType = { ...personalInfo, ...preferences };

        const dataToSend = new FormData();
        for (const key in formData) {
            if (key === "unofficialTranscript") {
                if (personalInfo.unofficialTranscript) {
                    dataToSend.append(
                        "unofficialTranscript",
                        personalInfo.unofficialTranscript
                    );
                }
            } else if (key === "unavailableTerms") {
                dataToSend.append(
                    key,
                    JSON.stringify(preferences.unavailableTerms)
                );
            } else {
                dataToSend.append(key, (formData as any)[key]);
            }
        }

        try {
            if (!token || !userId) {
                console.error("Token or UserId is missing.");
                throw new Error("Token or UserId is missing.");
            }

            const openAIService = new OpenAIService();
            const response = await openAIService.generatePlan(dataToSend);

            const userService = new UserService();
            await userService.updateUserById(userId, {
                $push: { degreePlan: response },
            });

            navigate("/degree-planner");
        } catch (error) {
            console.error("Error generating or saving degree plan:", error);
            alert(
                "There was an error processing your request. Please try again."
            );
        }
    };

    return (
        <div className="container mx-auto p-4">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                {/* Personal Information Component */}
                <PersonalInfoFormComponent
                    formData={personalInfo}
                    handleInputChange={handleInputChange}
                    isReadOnly={true}
                />

                {/* Preferences Information Component */}
                <PreferencesInfoFormComponent
                    formData={preferences}
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
        </div>
    );
}

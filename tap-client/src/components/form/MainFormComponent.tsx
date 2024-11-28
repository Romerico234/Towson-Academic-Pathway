import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IPersonalInfo } from "./interfaces/IPersonalInfo";
import { IPreferencesInfo } from "./interfaces/IPreferencesInfo";
import { IFormDataType } from "./interfaces/IFormDataType";
import PersonalInfoFormComponent from "./PersonalInfoFormComponent";
import PreferencesInfoFormComponent from "./PreferencesInfoFormComponent";
import OpenAIService from "../../shared/services/openai.service";
import { useAuth } from "../auth/AuthComponent";  // Import the useAuth hook
import AuthService from "../../shared/services/auth.service";
import UserService from "../../shared/services/user.service";

interface LocationState {
    firstName: string;
    lastName: string;
    email: string;
}

export default function MainFormComponent() {
    const { token } = useAuth(); 
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state as LocationState | undefined;

    const [personalInfo, setPersonalInfo] = useState<IPersonalInfo>({
        firstName: state?.firstName || "",
        lastName: state?.lastName || "",
        email: state?.email || "",
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

    // Fetch user data on component mount if state is undefined
    useEffect(() => {
        const fetchUserData = async () => {
            if (token && (!state || !state.firstName || !state.lastName || !state.email)) {
                try {
                    const userService = new UserService();
                    const userData = await userService.getUserByEmail(state?.email || "");
                    setPersonalInfo((prevState) => ({
                        ...prevState,
                        firstName: userData.firstName,
                        lastName: userData.lastName,
                        email: userData.email,
                    }));
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
        };
    
        if (token) {
            fetchUserData();
        }
    }, [token, state]);
    

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

        // Merge personalInfo and preferences into one object
        const formData: IFormDataType = { ...personalInfo, ...preferences };

        // Prepare data to send to OpenAI
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
            const openAIService = new OpenAIService();
            const response = await openAIService.generatePlan(dataToSend);
            console.log("Degree Plan Response:", response);

            const userService = new UserService();
            await userService.updateUserByEmail(personalInfo.email, {
                $push: { degreePlans: response },
            });
            console.log(
                "Updated Student Data:",
                await userService.getUserByEmail(personalInfo.email)
            );

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

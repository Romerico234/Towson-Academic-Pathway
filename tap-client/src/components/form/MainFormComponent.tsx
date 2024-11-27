import { useState } from "react";
import { IPersonalInfo } from "./interfaces/IPersonalInfo";
import { IPreferencesInfo } from "./interfaces/IPreferencesInfo";
import { IFormDataType } from "./interfaces/IFormDataType";
import PersonalInfoFormComponent from "./PersonalInfoFormComponent";
import PreferencesInfoFormComponent from "./PreferencesInfoFormComponent";
import OpenAIService from "../../shared/services/openai.service";
import DegreeCompletionPlannerComponent from "../degree-completion-planner/DegreeCompletionPlannerComponent";

export default function MainFormComponent() {
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
        preferredCreditHours: 12,
        allowSummerWinter: false,
        generalEducationCompleted: false,
        unavailableTerms: [],
        additionalComments: "",
    });

    const [planData, setPlanData] = useState<any>(null); // Store OpenAI response
    const [showPlanner, setShowPlanner] = useState(false); // Track when to show planner

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

            // Store response and show the planner
            setPlanData(response);
            setShowPlanner(true);
        } catch (error) {
            console.error("Error generating degree plan:", error);
        }
    };

    if (showPlanner && planData) {
        // Directly render the planner with the response data
        return <DegreeCompletionPlannerComponent planData={planData} />;
    }

    return (
        <div className="max-w-4xl mx-auto mt-20 px-6">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                {/* Personal Information Component */}
                <PersonalInfoFormComponent
                    formData={personalInfo}
                    handleInputChange={handleInputChange}
                />

                {/* Preferences Information Component */}
                <PreferencesInfoFormComponent
                    formData={preferences}
                    handleInputChange={handleInputChange}
                />

                {/* Submit Button */}
                <button
                    type="submit"
                    className="mt-6 bg-towsonGold text-towsonBlack font-semibold py-2 px-4 rounded"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

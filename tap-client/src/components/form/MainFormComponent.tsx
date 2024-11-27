import React, { useState } from "react";
import PersonalInfoFormComponent from "./PersonalInfoFormComponent";
import PreferencesInfoFormComponent from "./PreferencesInfoFormComponent";
import OpenAIService from "../../shared/services/openai.service";
import { FormDataType } from "../../shared/types/types";

export default function MainFormCopmonent() {
    const [formData, setFormData] = useState<FormDataType>({
        // Initial data
        firstName: "",
        lastName: "",
        email: "",
        major: "",
        concentration: "",
        bachelorsDegree: "",
        unofficialTranscript: null,
        expectedGraduationSemester: "Spring",
        expectedGraduationYear: new Date().getFullYear(),
        preferredCreditHours: 12,
        allowSummerWinter: false,
        generalEducationCompleted: false,
        withdrawnCourses: false,
        unavailableTerms: [],
        prerequisitesHandling: "add",
        preferenceConflicts: "none",
        additionalComments: "",
    });

    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value, type } = e.target;
        if (type === "checkbox") {
            setFormData({
                ...formData,
                [name]: (e.target as HTMLInputElement).checked,
            });
        } else if (name === "unofficialTranscript") {
            setFormData({
                ...formData,
                unofficialTranscript: (e.target as HTMLInputElement).files
                    ? (e.target as HTMLInputElement).files![0]
                    : null,
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Prepare data to send
        const dataToSend = new FormData();
        for (const key in formData) {
            if (key === "unofficialTranscript") {
                if (formData.unofficialTranscript) {
                    dataToSend.append(
                        "unofficialTranscript",
                        formData.unofficialTranscript
                    );
                }
            } else if (key === "unavailableTerms") {
                dataToSend.append(
                    key,
                    JSON.stringify(formData.unavailableTerms)
                );
            } else {
                dataToSend.append(key, (formData as any)[key]);
            }
        }

        try {
            const openAIService = new OpenAIService();
            const response = await openAIService.generatePlan(dataToSend);
            // Handle the response (e.g., display the degree plan)
            console.log("Degree Plan Response:", response);
        } catch (error) {
            console.error("Error generating degree plan:", error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-20 px-6">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                {/* Personal Information Component */}
                <PersonalInfoFormComponent
                    formData={formData}
                    handleInputChange={handleInputChange}
                />

                {/* Preferences Information Component */}
                <PreferencesInfoFormComponent
                    formData={formData}
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

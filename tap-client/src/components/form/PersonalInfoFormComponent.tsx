import React from "react";
import { FormDataType } from "../../shared/types/types";

type Major = "Computer Science";

interface Props {
    formData: FormDataType;
    handleInputChange: (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => void;
}

export default function PersonalInfoFormComponent({
    formData,
    handleInputChange,
}: Props) {
    const majors: Major[] = ["Computer Science"];

    const concentrations: Record<Major, string[]> = {
        "Computer Science": [
            "General",
            "Cyber Operations",
            "Software Engineering",
        ],
    };

    const bachelorsDegrees = [
        "Bachelor of Science",
        "Bachelor of Arts",
        "Bachelor of Fine Arts",
    ];

    // Generate years between current year and +10 years
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 10 }, (_, i) => currentYear + i);

    return (
        <div className="bg-towsonBlack text-towsonWhite border-4 border-towsonGold rounded-lg p-4 mb-6">
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>

            {/* First Name */}
            <label className="block text-sm font-medium mb-2">
                First Name:
            </label>
            <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="mt-1 block w-full bg-towsonLineGold text-towsonBlack border border-towsonWhite rounded-md shadow-sm focus:ring-towsonGold focus:border-towsonGold"
            />

            {/* Last Name */}
            <label className="block text-sm font-medium mb-2">Last Name:</label>
            <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="mt-1 block w-full bg-towsonLineGold text-towsonBlack border border-towsonWhite rounded-md shadow-sm focus:ring-towsonGold focus:border-towsonGold"
            />

            {/* Email */}
            <label className="block text-sm font-medium mb-2">Email:</label>
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full bg-towsonLineGold text-towsonBlack border border-towsonWhite rounded-md shadow-sm focus:ring-towsonGold focus:border-towsonGold"
            />

            {/* Bachelor's Degree */}
            <label className="block text-sm font-medium mb-2">
                Bachelor's Degree:
            </label>
            <select
                name="bachelorsDegree"
                value={formData.bachelorsDegree}
                onChange={handleInputChange}
                className="mt-1 block w-full bg-towsonLineGold text-towsonBlack border border-towsonWhite rounded-md shadow-sm focus:ring-towsonGold focus:border-towsonGold"
            >
                <option value="">Select Bachelor's Degree</option>
                {bachelorsDegrees.map((degree) => (
                    <option key={degree} value={degree}>
                        {degree}
                    </option>
                ))}
            </select>

            {/* Major */}
            <label className="block text-sm font-medium mb-2">Major:</label>
            <select
                name="major"
                value={formData.major}
                onChange={handleInputChange}
                className="mt-1 block w-full bg-towsonLineGold text-towsonBlack border border-towsonWhite rounded-md shadow-sm focus:ring-towsonGold focus:border-towsonGold"
            >
                <option value="">Select Major</option>
                {majors.map((major) => (
                    <option key={major} value={major}>
                        {major}
                    </option>
                ))}
            </select>

            {/* Concentration */}
            {majors.includes(formData.major as Major) &&
                concentrations[formData.major as Major] && (
                    <>
                        <label className="block text-sm font-medium mb-2">
                            Concentration:
                        </label>
                        <select
                            name="concentration"
                            value={formData.concentration}
                            onChange={handleInputChange}
                            className="mt-1 block w-full bg-towsonLineGold text-towsonBlack border border-towsonWhite rounded-md shadow-sm focus:ring-towsonGold focus:border-towsonGold"
                        >
                            <option value="">Select Concentration</option>
                            {concentrations[formData.major as Major].map(
                                (concentration) => (
                                    <option
                                        key={concentration}
                                        value={concentration}
                                    >
                                        {concentration}
                                    </option>
                                )
                            )}
                        </select>
                    </>
                )}

            {/* Expected Graduation */}
            <label className="block text-sm font-medium mb-2">
                Expected Graduation:
            </label>
            <div className="flex space-x-4 items-center">
                {/* Semester Dropdown */}
                <select
                    name="expectedGraduationSemester"
                    value={formData.expectedGraduationSemester}
                    onChange={handleInputChange}
                    className="mt-1 block w-full bg-towsonLineGold text-towsonBlack border border-towsonWhite rounded-md shadow-sm focus:ring-towsonGold focus:border-towsonGold"
                >
                    <option value="Spring">Spring</option>
                    <option value="Fall">Fall</option>
                </select>

                {/* Year Dropdown */}
                <select
                    name="expectedGraduationYear"
                    value={formData.expectedGraduationYear}
                    onChange={handleInputChange}
                    className="mt-1 block w-full bg-towsonLineGold text-towsonBlack border border-towsonWhite rounded-md shadow-sm focus:ring-towsonGold focus:border-towsonGold"
                >
                    {years.map((y) => (
                        <option key={y} value={y}>
                            {y}
                        </option>
                    ))}
                </select>
            </div>

            {/* Upload Unofficial Transcript */}
            <label className="block text-sm font-medium mb-2 mt-4">
                Upload Unofficial Transcript:
            </label>
            <input
                type="file"
                name="unofficialTranscript"
                onChange={handleInputChange}
                className="mt-1 block w-full text-towsonWhite"
                accept=".pdf,.doc,.docx,.jpg,.png"
            />
        </div>
    );
}

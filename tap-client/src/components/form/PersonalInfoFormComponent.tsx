import { IPersonalInfo } from "./interfaces/IPersonalInfo";
import personImg from "../../assets/form-assets/person.png";
import mailImg from "../../assets/form-assets/mail.png";
import degreeHatImg from "../../assets/form-assets/degree-hat.png";
import schoolImg from "../../assets/form-assets/school.png";
import dateImg from "../../assets/form-assets/date.png";
import fileImg from "../../assets/form-assets/file.png";

type Major = "Computer Science";

interface Props {
    formData: IPersonalInfo;
    handleInputChange: (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => void;
    isReadOnly?: boolean;
    errors?: {
        firstName?: string;
        lastName?: string;
        email?: string;
        bachelorsDegree?: string;
        major?: string;
        concentration?: string;
        expectedGraduationSemester?: string;
        expectedGraduationYear?: string;
        unofficialTranscript?: string;
    };
}

export default function PersonalInfoFormComponent({
    formData,
    handleInputChange,
    isReadOnly = false,
    errors,
}: Props) {
    const majors: Major[] = ["Computer Science"];

    const concentrations: Record<string, string[]> = {
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

    const GRADUATION_SEMESTERS = ["Fall", "Spring", "Summer"];

    // Generate years between current year and +10 years
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 10 }, (_, i) => currentYear + i);

    return (
        <div className="container mx-auto p-4">
            <fieldset className="border-2 border-towsonBlack bg-towsonDarkerWhite p-6 rounded max-w-lg mx-auto">
                <legend className="text-2xl font-bold mb-4 text-towsonGoldDark">
                    Personal Information
                </legend>

                {/* First Name */}
                <div className="flex flex-wrap items-center mb-4">
                    <label className="w-full text-sm font-medium mb-2">
                        First Name
                    </label>
                    <div className="w-full">
                        <div className="flex">
                            <span className="bg-towsonGoldDark text-towsonBlack p-2 rounded-l">
                                <img
                                    src={personImg}
                                    alt="First Name Icon"
                                    className="w-6 h-6"
                                />
                            </span>
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                className={`w-full text-towsonBlack border border-towsonGraphiteLight rounded-r p-2 focus:outline-none focus:ring-2 focus:ring-towsonGoldLight ${
                                    isReadOnly
                                        ? "bg-gray-200 cursor-not-allowed"
                                        : "bg-white"
                                }`}
                                readOnly={isReadOnly}
                            />
                        </div>
                        {errors?.firstName && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.firstName}
                            </p>
                        )}
                    </div>
                </div>

                {/* Last Name */}
                <div className="flex flex-wrap items-center mb-4">
                    <label className="w-full text-sm font-medium mb-2">
                        Last Name
                    </label>
                    <div className="w-full">
                        <div className="flex">
                            <span className="bg-towsonGoldDark text-towsonBlack p-2 rounded-l">
                                <img
                                    src={personImg}
                                    alt="Last Name Icon"
                                    className="w-6 h-6"
                                />
                            </span>
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                className={`w-full text-towsonBlack border border-towsonGraphiteLight rounded-r p-2 focus:outline-none focus:ring-2 focus:ring-towsonGoldLight ${
                                    isReadOnly
                                        ? "bg-gray-200 cursor-not-allowed"
                                        : "bg-white"
                                }`}
                                readOnly={isReadOnly}
                            />
                        </div>
                        {errors?.lastName && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.lastName}
                            </p>
                        )}
                    </div>
                </div>

                {/* Email */}
                <div className="flex flex-wrap items-center mb-4">
                    <label className="w-full text-sm font-medium mb-2">
                        Email
                    </label>
                    <div className="w-full">
                        <div className="flex">
                            <span className="bg-towsonGoldDark text-towsonBlack p-2 rounded-l">
                                <img
                                    src={mailImg}
                                    alt="Email Icon"
                                    className="w-6 h-6"
                                />
                            </span>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleInputChange}
                                className={`w-full text-towsonBlack border border-towsonGraphiteLight rounded-r p-2 focus:outline-none focus:ring-2 focus:ring-towsonGoldLight ${
                                    isReadOnly
                                        ? "bg-gray-200 cursor-not-allowed"
                                        : "bg-white"
                                }`}
                                readOnly={isReadOnly}
                            />
                        </div>
                        {errors?.email && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.email}
                            </p>
                        )}
                    </div>
                </div>

                {/* Bachelor's Degree */}
                <div className="flex flex-wrap items-center mb-4">
                    <label className="w-full text-sm font-medium mb-2">
                        Bachelor's Degree
                    </label>
                    <div className="w-full">
                        <div className="flex">
                            <span className="bg-towsonGoldDark text-towsonBlack p-2 rounded-l">
                                <img
                                    src={degreeHatImg}
                                    alt="Degree Icon"
                                    className="w-6 h-6"
                                />
                            </span>
                            <select
                                name="bachelorsDegree"
                                value={formData.bachelorsDegree}
                                onChange={handleInputChange}
                                className="w-full text-towsonBlack border border-towsonGraphiteLight rounded-r p-2 focus:outline-none focus:ring-2 focus:ring-towsonGoldLight"
                            >
                                <option value="">
                                    Select Bachelor's Degree
                                </option>
                                {bachelorsDegrees.map((degree) => (
                                    <option key={degree} value={degree}>
                                        {degree}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {errors?.bachelorsDegree && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.bachelorsDegree}
                            </p>
                        )}
                    </div>
                </div>

                {/* Major */}
                <div className="flex flex-wrap items-center mb-4">
                    <label className="w-full text-sm font-medium mb-2">
                        Major
                    </label>
                    <div className="w-full">
                        <div className="flex">
                            <span className="bg-towsonGoldDark text-towsonBlack p-2 rounded-l">
                                <img
                                    src={schoolImg}
                                    alt="Major Icon"
                                    className="w-6 h-6"
                                />
                            </span>
                            <select
                                name="major"
                                value={formData.major}
                                onChange={handleInputChange}
                                className="w-full text-towsonBlack border border-towsonGraphiteLight rounded-r p-2 focus:outline-none focus:ring-2 focus:ring-towsonGoldLight"
                            >
                                <option value="">Select Major</option>
                                {majors.map((major) => (
                                    <option key={major} value={major}>
                                        {major}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {errors?.major && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.major}
                            </p>
                        )}
                    </div>
                </div>

                {/* Concentration */}
                {majors.includes(formData.major as Major) &&
                    concentrations[formData.major as Major] && (
                        <div className="flex flex-wrap items-center mb-4">
                            <label className="w-full text-sm font-medium mb-2">
                                Concentration
                            </label>
                            <div className="w-full">
                                <div className="flex">
                                    <span className="bg-towsonGoldDark text-towsonBlack p-2 rounded-l">
                                        <img
                                            src={degreeHatImg}
                                            alt="Concentration Icon"
                                            className="w-6 h-6"
                                        />
                                    </span>
                                    <select
                                        name="concentration"
                                        value={formData.concentration}
                                        onChange={handleInputChange}
                                        className="w-full text-towsonBlack border border-towsonGraphiteLight rounded-r p-2 focus:outline-none focus:ring-2 focus:ring-towsonGoldLight"
                                        disabled={!formData.major} // Disable if no major is selected
                                    >
                                        <option value="">
                                            Select Concentration
                                        </option>
                                        {concentrations[
                                            formData.major as Major
                                        ].map((concentration) => (
                                            <option
                                                key={concentration}
                                                value={concentration}
                                            >
                                                {concentration}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {errors?.concentration && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.concentration}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                {/* Expected Graduation Semester */}
                <div className="flex flex-wrap items-center mb-4">
                    <label className="w-full text-sm font-medium mb-2">
                        Expected Graduation Semester
                    </label>
                    <div className="w-full">
                        <div className="flex">
                            <span className="bg-towsonGoldDark text-towsonBlack p-2 rounded-l">
                                <img
                                    src={dateImg}
                                    alt="Graduation Semester Icon"
                                    className="w-6 h-6"
                                />
                            </span>
                            <select
                                name="expectedGraduationSemester"
                                value={
                                    formData.expectedGraduationSemester || ""
                                }
                                onChange={handleInputChange}
                                className="w-full text-towsonBlack border border-towsonGraphiteLight rounded-r p-2 focus:outline-none focus:ring-2 focus:ring-towsonGoldLight"
                            >
                                <option value="">Select Semester</option>
                                {GRADUATION_SEMESTERS.map((semester) => (
                                    <option key={semester} value={semester}>
                                        {semester}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/* Error Handling */}
                        {errors?.expectedGraduationSemester && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.expectedGraduationSemester}
                            </p>
                        )}
                    </div>
                </div>

                {/* Expected Graduation Year */}
                <div className="flex flex-wrap items-center mb-4">
                    <label className="w-full text-sm font-medium mb-2">
                        Expected Graduation Year
                    </label>
                    <div className="w-full">
                        <div className="flex">
                            <span className="bg-towsonGoldDark text-towsonBlack p-2 rounded-l">
                                <img
                                    src={dateImg}
                                    alt="Graduation Year Icon"
                                    className="w-6 h-6"
                                />
                            </span>
                            <select
                                name="expectedGraduationYear"
                                value={formData.expectedGraduationYear}
                                onChange={handleInputChange}
                                className="w-full text-towsonBlack border border-towsonGraphiteLight rounded-r p-2 focus:outline-none focus:ring-2 focus:ring-towsonGoldLight"
                            >
                                {years.map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Unofficial Transcript */}
                <div className="flex flex-wrap items-center mb-4">
                    <label className="w-full text-sm font-medium mb-2">
                        Unofficial Transcript
                    </label>
                    <div className="w-full">
                        <div className="flex">
                            <span className="bg-towsonGoldDark text-towsonBlack p-2 rounded-l">
                                <img
                                    src={fileImg}
                                    alt="File Icon"
                                    className="w-6 h-6"
                                />
                            </span>
                            <input
                                type="file"
                                name="unofficialTranscript"
                                onChange={handleInputChange}
                                className="w-full text-towsonBlack border border-towsonGraphiteLight rounded-r p-2 focus:outline-none focus:ring-2 focus:ring-towsonGoldLight"
                            />
                        </div>
                        {errors?.unofficialTranscript && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.unofficialTranscript}
                            </p>
                        )}
                    </div>
                </div>
            </fieldset>
        </div>
    );
}

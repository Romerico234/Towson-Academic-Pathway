import { IPersonalInfo } from "./interfaces/IPersonalInfo";
import personImg from "../../assets/form-assets/person.png";
import mailImg from "../../assets/form-assets/mail.png";
import degreeHatImg from "../../assets/form-assets/degree-hat.png";
import schoolImg from "../../assets/form-assets/school.png";
import dateImg from "../../assets/form-assets/date.png";
import fileImg from "../../assets/form-assets/file.png";
import starImg from "../../assets/form-assets/star.png";

type Major = "Computer Science";

interface Props {
    formData: IPersonalInfo;
    handleInputChange: (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => void;
    isReadOnly?: boolean;
}

export default function PersonalInfoFormComponent({
    formData,
    handleInputChange,
    isReadOnly = false,
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
        "Bachelor of Music",
        "Bachelor of Technical and Professional Studies",
    ];

    const semesters = ["Summer", "Spring", "Fall", "Winter"];

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
                                required
                            />
                        </div>
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
                                required
                            />
                        </div>
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
                                required
                            />
                        </div>
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
                                required
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
                                required
                            >
                                <option value="">Select Major</option>
                                {majors.map((major) => (
                                    <option key={major} value={major}>
                                        {major}
                                    </option>
                                ))}
                            </select>
                        </div>
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
                                            src={schoolImg}
                                            alt="Concentration Icon"
                                            className="w-6 h-6"
                                        />
                                    </span>
                                    <select
                                        name="concentration"
                                        value={formData.concentration}
                                        onChange={handleInputChange}
                                        className="w-full text-towsonBlack border border-towsonGraphiteLight rounded-r p-2 focus:outline-none focus:ring-2 focus:ring-towsonGoldLight"
                                        required
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
                            </div>
                        </div>
                    )}

                {/* Start Date for Degree Completion Plan */}
                <div className="flex flex-wrap items-center mb-4">
                    <label className="w-full text-sm font-medium mb-2">
                        Start Date for Degree Completion Plan
                    </label>
                    <div className="w-full">
                        <div className="flex">
                            <span className="bg-towsonGoldDark text-towsonBlack p-2 rounded-l">
                                <img
                                    src={dateImg}
                                    alt="Start Date Icon"
                                    className="w-6 h-6"
                                />
                            </span>
                            <select
                                name="startDateSemester"
                                value={formData.startDateSemester}
                                onChange={handleInputChange}
                                className="bg-white text-towsonBlack border border-towsonGraphiteLight p-2 focus:outline-none focus:ring-2 focus:ring-towsonGoldLight"
                                required
                            >
                                <option value="">Select Semester</option>
                                {semesters.map((semester) => (
                                    <option key={semester} value={semester}>
                                        {semester}
                                    </option>
                                ))}
                            </select>
                            <select
                                name="startDateYear"
                                value={formData.startDateYear}
                                onChange={handleInputChange}
                                className="bg-white text-towsonBlack border border-towsonGraphiteLight p-2 focus:outline-none focus:ring-2 focus:ring-towsonGoldLight"
                                required
                            >
                                {years.map((y) => (
                                    <option key={y} value={y}>
                                        {y}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Expected Graduation */}
                <div className="flex flex-wrap items-center mb-4">
                    <label className="w-full text-sm font-medium mb-2">
                        Expected Graduation
                    </label>
                    <div className="w-full">
                        <div className="flex">
                            <span className="bg-towsonGoldDark text-towsonBlack p-2 rounded-l">
                                <img
                                    src={dateImg}
                                    alt="Graduation Icon"
                                    className="w-6 h-6"
                                />
                            </span>
                            <select
                                name="expectedGraduationSemester"
                                value={formData.expectedGraduationSemester}
                                onChange={handleInputChange}
                                className="bg-white text-towsonBlack border border-towsonGraphiteLight p-2 focus:outline-none focus:ring-2 focus:ring-towsonGoldLight"
                                required
                            >
                                <option value="">Select Semester</option>
                                <option value="Spring">Spring</option>
                                <option value="Fall">Fall</option>
                            </select>
                            <select
                                name="expectedGraduationYear"
                                value={formData.expectedGraduationYear}
                                onChange={handleInputChange}
                                className="bg-white text-towsonBlack border border-towsonGraphiteLight p-2 focus:outline-none focus:ring-2 focus:ring-towsonGoldLight"
                                required
                            >
                                {years.map((y) => (
                                    <option key={y} value={y}>
                                        {y}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* In Honors College */}
                <div className="flex flex-wrap items-center mb-4">
                    <label className="w-full text-sm font-medium mb-2">
                        Are you in the Honors College?
                    </label>
                    <div className="w-full">
                        <div className="flex">
                            <span className="bg-towsonGoldDark text-towsonBlack p-2 rounded-l">
                                <img
                                    src={starImg}
                                    alt="Honors Icon"
                                    className="w-6 h-6"
                                />
                            </span>
                            <div className="flex items-center bg-white text-towsonBlack border border-towsonGraphiteLight rounded-r p-2 focus:outline-none focus:ring-2 focus:ring-towsonGoldLight w-full">
                                <div className="flex items-center space-x-6">
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            name="isHonorsStudent"
                                            value="true"
                                            checked={
                                                formData.isHonorsStudent ===
                                                true
                                            }
                                            onChange={handleInputChange}
                                            className="form-radio h-5 w-5 text-towsonGoldDark focus:ring-towsonGoldLight"
                                            required
                                        />
                                        <span className="text-towsonBlack">
                                            Yes
                                        </span>
                                    </label>
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            name="isHonorsStudent"
                                            value="false"
                                            checked={
                                                formData.isHonorsStudent ===
                                                false
                                            }
                                            onChange={handleInputChange}
                                            className="form-radio h-5 w-5 text-towsonGoldDark focus:ring-towsonGoldLight"
                                            required
                                        />
                                        <span className="text-towsonBlack">
                                            No
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Upload Unofficial Transcript */}
                <div className="flex flex-wrap items-center mb-4">
                    <label className="w-full text-sm font-medium mb-2">
                        Upload Unofficial Transcript
                    </label>
                    <div className="w-full">
                        <div className="flex">
                            <span className="bg-towsonGoldDark text-towsonBlack p-2 rounded-l">
                                <img
                                    src={fileImg}
                                    alt="Upload Icon"
                                    className="w-6 h-6"
                                />
                            </span>
                            <input
                                type="file"
                                name="unofficialTranscript"
                                onChange={handleInputChange}
                                className="w-full text-towsonBlack bg-white border border-towsonGraphiteLight rounded-r p-2 focus:outline-none focus:ring-2 focus:ring-towsonGoldLight"
                                accept=".pdf,.doc,.docx,.jpg,.png"
                                required
                            />
                        </div>
                    </div>
                </div>
            </fieldset>
        </div>
    );
}

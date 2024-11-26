import { useState } from "react";

export default function FormComponent() {
    const formSectionStyle =
        "bg-towsonBlack text-towsonWhite border-4 border-towsonGold rounded-lg p-4 mb-6";
    //"bg-towsonBlack text-towsonWhite border border-towsonGold rounded-lg p-6 mb-6 shadow-lg";
    const divisionHeaderStyle = "text-center text-xl font-semibold mb-4";
    const labelStyle = "block text-sm font-medium mb-2";
    // const inputStyle =
    //   "mt-1 block w-full bg-towsonLineGold text-towsonBlack border border-towsonWhite rounded-md shadow-sm focus:ring-towsonGold focus:border-towsonGold";
    const dropdownStyle =
        "mt-1 block w-full bg-towsonLineGold text-towsonBlack border border-towsonWhite rounded-md shadow-sm focus:ring-towsonGold focus:border-towsonGold";
    const textAreaStyle =
        "placeholder-towsonWhite mt-1 block w-full bg-towsonLineGold text-towsonBlack border border-towsonWhite rounded-md shadow-sm focus:ring-towsonGold focus:border-towsonGold";

    // State for Graduation Date
    const [semester, setSemester] = useState<string>("Spring");
    const [year, setYear] = useState<number>(2024);

    // Generate years between 2000 and 2099
    const years = Array.from({ length: 20 }, (_, i) => 2024 + i);

    // State for selected credit hours
    const [creditHours, setCreditHours] = useState<number>(12);

    // Generate options for credit hours from 9 to 18
    const creditHourOptions = Array.from({ length: 13 }, (_, i) => 6 + i);

    const [freeResponse, setFreeResponse] = useState<string>("");

    return (
        <div className="max-w-4xl mx-auto mt-20 px-6">
            <div className="bg-towsonBlack text-towsonWhite border-4 border-towsonGold rounded-lg p-4 mb-6">
                <h1 className="text-4xl font-bold text-towsonWhite mb-1 text-center border-4 border-towsonGold rounded-lg p-4">
                    Preferences
                </h1>
            </div>

            {/* General Preferences Division */}
            <div className={formSectionStyle}>
                <h2 className={divisionHeaderStyle}>General Preferences</h2>
                <div>
                    {/* Graduation Date Section */}
                    <label className={labelStyle}>
                        When do you expect to graduate?
                    </label>
                    <div className="flex space-x-4 items-center">
                        {/* Semester Dropdown */}
                        <select
                            value={semester}
                            onChange={(e) => setSemester(e.target.value)}
                            className={dropdownStyle}
                        >
                            <option value="Spring">Spring</option>
                            <option value="Fall">Fall</option>
                        </select>

                        {/* Year Dropdown */}
                        <select
                            value={year}
                            onChange={(e) =>
                                setYear(parseInt(e.target.value, 10))
                            }
                            className={dropdownStyle}
                        >
                            {years.map((y) => (
                                <option key={y} value={y}>
                                    {y}
                                </option>
                            ))}
                        </select>
                    </div>
                    <p className="mt-2 text-sm">
                        Selected Time:{" "}
                        <span className="font-semibold">
                            {semester} {year}
                        </span>
                    </p>
                    <br />

                    {/* Credit Hours Section */}
                    <label className={labelStyle}>
                        Select the closest option to your preferred number of
                        credit hours per semester:
                    </label>
                    <select
                        value={creditHours}
                        onChange={(e) =>
                            setCreditHours(parseInt(e.target.value, 10))
                        }
                        className={dropdownStyle}
                        //size={5} // Makes the dropdown scrollable, showing 5 options at a time
                    >
                        {creditHourOptions.map((hours) => (
                            <option key={hours} value={hours}>
                                {hours}
                            </option>
                        ))}
                    </select>
                    <p className="mt-2 text-sm">
                        Selected Credit Hours:{" "}
                        <span className="font-semibold">{creditHours}</span>
                    </p>
                    <br />

                    {/* Allow Summer/Winter Section */}
                    <label className={labelStyle}>
                        Do you want to take classes over the summer and winter?
                    </label>
                    <div className="space-y-2">
                        <div>
                            <input
                                type="radio"
                                id="summerWinterYes"
                                name="summerWinter"
                            />
                            <label htmlFor="summerWinterYes" className="ml-2">
                                Yes
                            </label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                id="summerWinterNo"
                                name="summerWinter"
                            />
                            <label htmlFor="summerWinterNo" className="ml-2">
                                No
                            </label>
                        </div>
                    </div>
                    <br />
                </div>
                {/* Add other form fields as in the provided layout */}
            </div>

            {/* Academic Progress Division */}
            <div className={formSectionStyle}>
                <h2 className={divisionHeaderStyle}>Academic Progress</h2>
                <div>
                    {/* General Education Requirements Section */}
                    <label className={labelStyle}>
                        Have you completed your general education requirements?
                    </label>
                    <div className="space-y-2">
                        <div>
                            <input type="radio" id="gerYes" name="ger" />
                            <label htmlFor="gerYes" className="ml-2">
                                Yes
                            </label>
                        </div>
                        <div>
                            <input type="radio" id="gerNo" name="ger" />
                            <label htmlFor="gerNo" className="ml-2">
                                No
                            </label>
                        </div>
                    </div>
                    <br />

                    {/* Withdrawn Section */}
                    <label className={labelStyle}>
                        Have you withdrawn from any courses?
                    </label>
                    <div className="space-y-2">
                        <div>
                            <input
                                type="radio"
                                id="withdrawYes"
                                name="withdraw"
                            />
                            <label htmlFor="withdrawYes" className="ml-2">
                                Yes
                            </label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                id="withdrawNo"
                                name="withdraw"
                            />
                            <label htmlFor="withdrawNo" className="ml-2">
                                No
                            </label>
                        </div>
                    </div>
                    <br />
                </div>
            </div>

            {/* Course Scheduling Division */}
            <div className={formSectionStyle}>
                <h2 className={divisionHeaderStyle}>
                    Course Scheduling Preferences
                </h2>
                <div>
                    {/* Electives Section */}
                    <label className={labelStyle}>
                        Are there any terms where you will be unavailable?
                        <br />
                        Include these in the free response in the end if so.
                    </label>
                    <div className="space-y-2">
                        <div>
                            <input type="radio" id="busyYes" name="busy" />
                            <label htmlFor="busyYes" className="ml-2">
                                Yes
                            </label>
                        </div>
                        <div>
                            <input type="radio" id="busyNo" name="busy" />
                            <label htmlFor="busyNo" className="ml-2">
                                No
                            </label>
                        </div>
                    </div>
                    <br />
                </div>
            </div>

            {/* Dynamic Adjustments Division */}
            <div className={formSectionStyle}>
                <h2 className={divisionHeaderStyle}>Dynamic Adjustments</h2>
                <div>
                    {/* Electives Section */}
                    <label className={labelStyle}>Prerequisites:</label>
                    <div className="space-y-2">
                        <div>
                            <input
                                type="radio"
                                id="prerequisitesAdd"
                                name="prerequisites"
                            />
                            <label htmlFor="prerequisitesAdd" className="ml-2">
                                Add missing prerequisites automatically
                            </label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                id="prerequisitesSkip"
                                name="prerequisites"
                            />
                            <label htmlFor="prerequisitesSkip" className="ml-2">
                                Skip and show a warning in the plan
                            </label>
                        </div>
                    </div>
                    <br />

                    {/* Electives Section */}
                    <label className={labelStyle}>Preference Conflicts:</label>
                    <div className="space-y-2">
                        <div>
                            <input
                                type="radio"
                                id="prioritizeTime"
                                name="prioritize"
                            />
                            <label htmlFor="prioritizeTime" className="ml-2">
                                Prioritize timing
                            </label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                id="prioritizeInstructor"
                                name="prioritize"
                            />
                            <label
                                htmlFor="prioritizeInstructor"
                                className="ml-2"
                            >
                                Prioritize instructor
                            </label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                id="prioritizeNone"
                                name="prioritize"
                            />
                            <label htmlFor="prioritizeNone" className="ml-2">
                                No specific priority
                            </label>
                        </div>
                    </div>
                    <br />
                </div>
            </div>

            {/* Free Response Division */}
            <div className={formSectionStyle}>
                <h2 className={divisionHeaderStyle}>Free Response</h2>
                <label htmlFor="free-response" className={labelStyle}>
                    Additional Comments or Preferences (e.g., instructor,
                    specific time of day, etc.):
                </label>
                <textarea
                    id="free-response"
                    value={freeResponse}
                    onChange={(e) => setFreeResponse(e.target.value)}
                    rows={5}
                    className={textAreaStyle}
                    placeholder="Enter any additional comments or preferences here..."
                ></textarea>
            </div>
            {/* Add additional sections here with similar styling */}
        </div>
    );
}

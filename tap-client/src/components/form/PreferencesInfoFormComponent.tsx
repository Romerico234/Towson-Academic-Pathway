interface Props {
    formData: any;
    handleInputChange: (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => void;
}

export default function PreferencesInfoFormComponent({
    formData,
    handleInputChange,
}: Props) {
    const creditHourOptions = [
        { label: "5 and below", value: "0-5" },
        { label: "6-9", value: "6-9" },
        { label: "10-12", value: "10-12" },
        { label: "13-16", value: "13-16" },
        { label: "17-19", value: "17-19" },
        { label: "20 and above", value: "20+" },
    ];

    return (
        <div className="bg-towsonBlack text-towsonWhite border-4 border-towsonGold rounded-lg p-4 mb-6">
            <h2 className="text-xl font-semibold mb-4">Preferences</h2>

            {/* Preferred Credit Hours */}
            <label className="block text-sm font-medium mb-2">
                Preferred Credit Hours per Semester:
            </label>
            <select
                name="preferredCreditHours"
                value={formData.preferredCreditHours}
                onChange={handleInputChange}
                className="mt-1 block w-full bg-towsonLineGold text-towsonBlack border border-towsonWhite rounded-md shadow-sm focus:ring-towsonGold focus:border-towsonGold"
            >
                {creditHourOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            {/* Allow Summer/Winter Classes */}
            <label className="block text-sm font-medium mb-2 mt-4">
                Do you want to take classes over the summer and winter?
            </label>
            <div className="space-y-2">
                <div>
                    <input
                        type="radio"
                        id="summerWinterYes"
                        name="allowSummerWinter"
                        value="true"
                        checked={formData.allowSummerWinter === true}
                        onChange={() =>
                            handleInputChange({
                                target: {
                                    name: "allowSummerWinter",
                                    value: "true",
                                    type: "radio",
                                },
                            } as any)
                        }
                    />
                    <label htmlFor="summerWinterYes" className="ml-2">
                        Yes
                    </label>
                </div>
                <div>
                    <input
                        type="radio"
                        id="summerWinterNo"
                        name="allowSummerWinter"
                        value="false"
                        checked={formData.allowSummerWinter === false}
                        onChange={() =>
                            handleInputChange({
                                target: {
                                    name: "allowSummerWinter",
                                    value: "false",
                                    type: "radio",
                                },
                            } as any)
                        }
                    />
                    <label htmlFor="summerWinterNo" className="ml-2">
                        No
                    </label>
                </div>
            </div>

            {/* General Education Requirements */}
            <label className="block text-sm font-medium mb-2 mt-4">
                Have you completed your general education requirements?
            </label>
            <div className="space-y-2">
                <div>
                    <input
                        type="radio"
                        id="gerYes"
                        name="generalEducationCompleted"
                        value="true"
                        checked={formData.generalEducationCompleted === true}
                        onChange={() =>
                            handleInputChange({
                                target: {
                                    name: "generalEducationCompleted",
                                    value: "true",
                                    type: "radio",
                                },
                            } as any)
                        }
                    />
                    <label htmlFor="gerYes" className="ml-2">
                        Yes
                    </label>
                </div>
                <div>
                    <input
                        type="radio"
                        id="gerNo"
                        name="generalEducationCompleted"
                        value="false"
                        checked={formData.generalEducationCompleted === false}
                        onChange={() =>
                            handleInputChange({
                                target: {
                                    name: "generalEducationCompleted",
                                    value: "false",
                                    type: "radio",
                                },
                            } as any)
                        }
                    />
                    <label htmlFor="gerNo" className="ml-2">
                        No
                    </label>
                </div>
            </div>

            {/* Unavailable Terms */}
            <label className="block text-sm font-medium mb-2 mt-4">
                Are there any terms where you will be unavailable? Please
                specify.
            </label>
            <input
                type="text"
                name="unavailableTerms"
                value={formData.unavailableTerms.join(", ")}
                onChange={(e) =>
                    handleInputChange({
                        ...e,
                        target: {
                            ...e.target,
                            name: "unavailableTerms",
                            value: e.target.value,
                        },
                    })
                }
                className="mt-1 block w-full bg-towsonLineGold text-towsonBlack border border-towsonWhite rounded-md shadow-sm focus:ring-towsonGold focus:border-towsonGold"
                placeholder="e.g., Summer 2024, Fall 2025"
            />

            {/* Additional Comments */}
            <label
                htmlFor="additionalComments"
                className="block text-sm font-medium mb-2 mt-4"
            >
                Additional Comments or Preferences:
            </label>
            <textarea
                id="additionalComments"
                name="additionalComments"
                value={formData.additionalComments}
                onChange={handleInputChange}
                rows={5}
                className="mt-1 block w-full bg-towsonLineGold text-towsonBlack border border-towsonWhite rounded-md shadow-sm focus:ring-towsonGold focus:border-towsonGold"
                placeholder="Enter any additional comments or preferences here..."
            ></textarea>
        </div>
    );
}

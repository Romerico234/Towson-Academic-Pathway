import { IPreferencesInfo } from "./interfaces/IPreferencesInfo";

interface Props {
    formData: IPreferencesInfo;
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
                        target: {
                            name: "unavailableTerms",
                            value: e.target.value
                                .split(",")
                                .map((term) => term.trim()),
                        },
                    } as unknown as React.ChangeEvent<HTMLInputElement>)
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

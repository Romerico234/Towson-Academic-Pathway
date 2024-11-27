import { IPreferencesInfo } from "./interfaces/IPreferencesInfo";
import hashtagImg from "../../assets/form-assets/hashtag.png";
import pencilImg from "../../assets/form-assets/pencil.png";

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
        { label: "6 and below", value: "0-6" },
        { label: "7-10", value: "7-19" },
        { label: "11-14", value: "11-14" },
        { label: "15-18", value: "15-18" },
        { label: "19-22", value: "19-22" },
        { label: "23 and above", value: "23+" },
    ];

    return (
        <div className="container mx-auto p-4">
            <fieldset className="border-2 border-towsonBlack bg-towsonDarkerWhite p-6 rounded max-w-lg mx-auto">
                <legend className="text-2xl font-bold mb-4 text-towsonGoldDark">
                    Preferences
                </legend>

                {/* Preferred Credit Hours */}
                <div className="flex flex-wrap items-center mb-4">
                    <label className="w-full text-sm font-medium mb-2">
                        Preferred Credit Hours per Semester
                    </label>
                    <div className="w-full">
                        <div className="flex">
                            <span className="bg-towsonGoldDark text-towsonBlack p-2 rounded-l">
                                <img
                                    src={hashtagImg}
                                    alt="Credit Hours Icon"
                                    className="w-6 h-6"
                                />
                            </span>
                            <select
                                name="preferredCreditHours"
                                value={formData.preferredCreditHours}
                                onChange={handleInputChange}
                                className="w-full bg-white text-towsonBlack border border-towsonGraphiteLight rounded-r p-2 focus:outline-none focus:ring-2 focus:ring-towsonGoldLight"
                            >
                                {creditHourOptions.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Unavailable Terms */}
                <div className="flex flex-wrap items-center mb-4">
                    <label className="w-full text-sm font-medium mb-2">
                        Unavailable Terms
                    </label>
                    <div className="w-full">
                        <div className="flex">
                            <span className="bg-towsonGoldDark text-towsonBlack p-2 rounded-l">
                                <img
                                    src={pencilImg}
                                    alt="Unavailable Terms Icon"
                                    className="w-6 h-6"
                                />
                            </span>
                            <input
                                type="text"
                                name="unavailableTerms"
                                placeholder="e.g., Summer 2024, Fall 2025"
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
                                className="w-full bg-white text-towsonBlack border border-towsonGraphiteLight rounded-r p-2 focus:outline-none focus:ring-2 focus:ring-towsonGoldLight"
                            />
                        </div>
                    </div>
                </div>

                {/* Additional Comments */}
                <div className="flex flex-wrap items-start mb-4">
                    <label className="w-full text-sm font-medium mb-2">
                        Additional Comments or Preferences
                    </label>
                    <div className="w-full">
                        <div className="flex">
                            <span className="bg-towsonGoldDark text-towsonBlack p-2 rounded-l">
                                <img
                                    src={pencilImg}
                                    alt="Comments Icon"
                                    className="w-6 h-6"
                                />
                            </span>
                            <textarea
                                id="additionalComments"
                                name="additionalComments"
                                placeholder="Enter any additional comments or preferences here..."
                                value={formData.additionalComments}
                                onChange={handleInputChange}
                                rows={5}
                                className="w-full bg-white text-towsonBlack border border-towsonGraphiteLight rounded-r p-2 focus:outline-none focus:ring-2 focus:ring-towsonGoldLight"
                            ></textarea>
                        </div>
                    </div>
                </div>
            </fieldset>
        </div>
    );
}

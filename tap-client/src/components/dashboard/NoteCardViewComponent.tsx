import { useState } from "react";

interface NoteCardViewComponentProps {
    notes: string;
    setNotes: (notes: string) => void;
    onClose: () => void;
}

export default function NoteCardViewComponent({
    notes,
    setNotes,
    onClose,
}: NoteCardViewComponentProps) {
    const [tempNotes, setTempNotes] = useState(notes);

    const handleSave = () => {
        setNotes(tempNotes);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-lg">
                <h2 className="text-lg font-bold mb-4">Edit Notes</h2>
                <textarea
                    value={tempNotes}
                    onChange={(e) => setTempNotes(e.target.value)}
                    className="w-full p-2 border rounded-md text-gray-700 text-sm"
                    rows={5}
                />
                <div className="flex justify-end mt-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 mr-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

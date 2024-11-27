interface DegreePlanNavigatorProps {
    currentPlanIndex: number;
    totalPlans: number;
    onPrevious: () => void;
    onNext: () => void;
    onFavorite: () => void;
    isFavorited: boolean;
}

export default function DegreePlanNavigator({
    currentPlanIndex,
    totalPlans,
    onPrevious,
    onNext,
    onFavorite,
    isFavorited,
}: DegreePlanNavigatorProps) {
    return (
        <div className="flex items-center justify-between mb-4">
            <button
                onClick={onPrevious}
                disabled={currentPlanIndex === 0}
                className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
            >
                Previous
            </button>
            <div>
                Plan {currentPlanIndex + 1} of {totalPlans}
            </div>
            <button
                onClick={onNext}
                disabled={currentPlanIndex === totalPlans - 1}
                className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
            >
                Next
            </button>
            <button
                onClick={onFavorite}
                className={`ml-4 px-4 py-2 rounded ${
                    isFavorited
                        ? "bg-red-500 text-white"
                        : "bg-green-500 text-white"
                }`}
            >
                {isFavorited ? "Unfavorite" : "Favorite"}
            </button>
        </div>
    );
}

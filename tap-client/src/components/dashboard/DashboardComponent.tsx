import DegreeCompletionPlannerComponent from "./DegreeCompletionPlannerComponent";

export default function DashboardComponent() {
    return (
        <div className="flex h-screen overflow-hidden">
            {/* Main Content Area (Degree Completion Planner) */}
            <div className="flex-grow flex flex-col border-r p-4">
                <header className="mb-4">
                    <h1 className="text-2xl font-bold border-b pb-2">
                        Degree Completion Planner
                    </h1>
                </header>
                <div className="flex-grow overflow-auto rounded-lg bg-white shadow p-4">
                    <DegreeCompletionPlannerComponent />
                </div>
            </div>
        </div>
    );
}

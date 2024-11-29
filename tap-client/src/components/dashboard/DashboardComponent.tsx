import DegreeCompletionPlannerComponent from "./DegreeCompletionPlannerComponent";
import CourseCatalogComponent from "./CourseCatalogComponent";

export default function DashboardComponent() {
    return (
        <div className="flex h-screen overflow-hidden">
            {/* Main Content Area */}
            <div className="flex-grow flex flex-col overflow-hidden">
                <header className="mb-4">
                    <h1 className="text-2xl font-bold">
                        Degree Completion Planner
                    </h1>
                </header>
                <div className="flex-grow overflow-auto">
                    <DegreeCompletionPlannerComponent />
                </div>
            </div>

            {/* Right Sidebar (Course Catalog) */}
            <aside className="w-[30%] border-l overflow-auto p-4">
                <h2 className="text-2xl font-semibold mb-4">Course Catalog</h2>
                <CourseCatalogComponent />
            </aside>
        </div>
    );
}

import DegreeCompletionPlannerComponent from "./DegreeCompletionPlannerComponent";
import CourseCatalogComponent from "./CourseCatalogComponent";

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

            {/* Right Sidebar (Course Catalog) */}
            <aside className="w-[30%] border-l p-4">
                <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
                    Course Catalog
                </h2>
                <div className="rounded-lg bg-white shadow p-4 overflow-auto h-full">
                    <CourseCatalogComponent />
                </div>
            </aside>
        </div>
    );
}

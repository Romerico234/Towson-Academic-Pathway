import { Outlet } from "react-router-dom";
import SidebarComponent from "../components/sidebar/SidebarComponent";

export default function AuthenticatedLayout() {
    return (
        <div className="authenticated-layout flex h-screen overflow-hidden">
            {/* Sidebar Component */}
            <div className="w-[180px] flex-shrink-0">
                <SidebarComponent />
            </div>

            {/* Main Content Area */}
            <div className="content flex-grow overflow-auto">
                <Outlet />
            </div>
        </div>
    );
}

import { Outlet } from "react-router-dom";
import SidebarComponent from "../components/sidebar/SidebarComponent";

export default function AuthenticatedLayout() {
    return (
        <div className="authenticated-layout flex h-screen overflow-hidden">
            {/* Sidebar Component */}
            <div className="content flex-grow ">
                <SidebarComponent />
            </div>

            {/* Main Content Area */}
            <div className="content flex-grow">
                <Outlet />
            </div>
        </div>
    );
}

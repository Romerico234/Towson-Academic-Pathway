import { Outlet } from "react-router-dom";
import SidebarComponent from "../components/sidebar/SidebarComponent";

export default function AuthenticatedLayout() {
    return (
        <div className="authenticated-layout flex">
            <SidebarComponent />
            <div className="content flex-grow">
                <Outlet />
            </div>
        </div>
    );
}

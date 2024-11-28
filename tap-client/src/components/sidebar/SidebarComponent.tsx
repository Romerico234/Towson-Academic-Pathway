import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthComponent";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import bookImg from "../../assets/sidebar-assets/book.png";
import homeImg from "../../assets/sidebar-assets/home.png";
import plannerImg from "../../assets/sidebar-assets/planner.png";
import settingsImg from "../../assets/sidebar-assets/settings.png";
import profileImg from "../../assets/sidebar-assets/profile.png";
import logoutImg from "../../assets/sidebar-assets/logout.png";

export default function SidebarComponent() {
    const [collapsed, setCollapsed] = useState(false);
    const { logout } = useAuth();
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    const handleLogout = () => {
        logout();
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("refreshToken");
        navigate("/home");
    };

    return (
        <Sidebar
            collapsed={collapsed}
            backgroundColor="#FFBB00"
            width="270px"
            collapsedWidth="80px"
            transitionDuration={300}
            style={{
                position: "fixed",
                height: "100vh",
                bottom: 0,
                zIndex: 1000,
                boxShadow: "0 0 30px rgba(0, 0, 0, 0.1)",
            }}
        >
            {/* Toggle Button */}
            <button
                onClick={toggleSidebar}
                className="p-4 text-xl font-bold flex items-center hover:bg-towsonGoldLight"
                style={{ color: "#000000" }}
            >
                TAP
            </button>

            <Menu
                menuItemStyles={{
                    button: {
                        // Active state styling
                        [`&.active`]: {
                            backgroundColor: "#FFBB00", // This not even doing anything
                            color: "#000000",
                            fontWeight: "bold",
                        },
                        // Hover state styling
                        "&:hover": {
                            backgroundColor: "#FFE066",
                            color: "#3C3C3C",
                        },
                        padding: "12px 16px",
                        fontSize: "16px",
                    },
                }}
            >
                {/* Public Home */}
                <MenuItem component={<Link to="/home" />}>
                    <img
                        src={homeImg}
                        alt="Home Icon"
                        className="inline-block mr-2 w-6 h-6"
                    />
                    Public Home
                </MenuItem>

                {/* Course Catalog */}
                <MenuItem component={<Link to="/course-catalog" />}>
                    <img
                        src={bookImg}
                        alt="Course Catalog Icon"
                        className="inline-block mr-2 w-6 h-6"
                    />
                    Course Catalog
                </MenuItem>

                {/* Degree Planner */}
                <MenuItem component={<Link to="/degree-planner" />}>
                    <img
                        src={plannerImg}
                        alt="Degree Planner Icon"
                        className="inline-block mr-2 w-6 h-6"
                    />
                    Degree Planner
                </MenuItem>

                {/* Settings */}
                <SubMenu
                    icon={
                        <img
                            src={settingsImg}
                            alt="Settings Icon"
                            className="inline-block mr-2 w-6 h-6"
                        />
                    }
                    title="Settings"
                >
                    <MenuItem component={<Link to="/settings" />}>
                        <img
                            src={profileImg}
                            alt="Profile Icon"
                            className="inline-block mr-2 w-6 h-6"
                        />
                        Profile
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                        <img
                            src={logoutImg}
                            alt="Logout Icon"
                            className="inline-block mr-2 w-6 h-6"
                        />
                        Logout
                    </MenuItem>
                </SubMenu>
            </Menu>
        </Sidebar>
    );
}

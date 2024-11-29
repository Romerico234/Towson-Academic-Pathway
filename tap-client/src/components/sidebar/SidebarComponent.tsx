// import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthComponent";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import homeImg from "../../assets/sidebar-assets/home.png";
import settingsImg from "../../assets/sidebar-assets/settings.png";
import profileImg from "../../assets/sidebar-assets/profile.png";
import logoutImg from "../../assets/sidebar-assets/logout.png";
import requirementsImg from "../../assets/sidebar-assets/requirements.png";
import dashboardImg from "../../assets/sidebar-assets/dashboard.png";
import formImg from "../../assets/sidebar-assets/form.png";
import favoriteImg from "../../assets/sidebar-assets/favorite.png";

export default function SidebarComponent() {
    // const [collapsed, setCollapsed] = useState(true);
    const { logout } = useAuth();
    const navigate = useNavigate();

    // const toggleSidebar = () => {
    //     setCollapsed(!collapsed);
    // };

    const handleLogout = () => {
        logout();
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("refreshToken");
        navigate("/home");
    };

    return (
        <Sidebar
            // collapsed={collapsed}
            backgroundColor="#FFBB00"
            width="180px"
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
                // onClick={toggleSidebar}
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
                {/* Home Page */}
                <MenuItem component={<Link to="/home" />}>
                    <img
                        src={homeImg}
                        alt="Home Icon"
                        className="inline-block mr-2 w-6 h-6"
                    />
                    Home Page
                </MenuItem>

                {/* Dashboard */}
                <MenuItem component={<Link to="/dashboard" />}>
                    <img
                        src={dashboardImg}
                        alt="Dashboard Icon"
                        className="inline-block mr-2 w-6 h-6"
                    />
                    Dashboard
                </MenuItem>

                {/* TODO: Implement Favorites Component*/}
                {/* Favorites */}
                <MenuItem component={<Link to="/favorites" />}>
                    <img
                        src={favoriteImg}
                        alt="Favorite Icon"
                        className="inline-block mr-2 w-6 h-6"
                    />
                    Favorites
                </MenuItem>

                {/* TODO: Implement Requirements Component*/}
                {/* Requirements */}
                <MenuItem component={<Link to="/requirements" />}>
                    <img
                        src={requirementsImg}
                        alt="Requirements Icon"
                        className="inline-block mr-2 w-6 h-6"
                    />
                    Requirements
                </MenuItem>

                {/* Form */}
                <MenuItem component={<Link to="/form" />}>
                    <img
                        src={formImg}
                        alt="Form Icon"
                        className="inline-block mr-2 w-6 h-6"
                    />
                    Form
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

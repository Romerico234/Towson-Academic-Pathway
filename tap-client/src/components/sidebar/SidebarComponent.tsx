import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthComponent";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import Lottie from "lottie-react";
import loadingAnimation from "../../assets/lottie-assets/loading.json";
import homeImg from "../../assets/sidebar-assets/home.png";
import settingsImg from "../../assets/sidebar-assets/settings.png";
import profileImg from "../../assets/sidebar-assets/profile.png";
import logoutImg from "../../assets/sidebar-assets/logout.png";
import requirementsImg from "../../assets/sidebar-assets/requirements.png";
import dashboardImg from "../../assets/sidebar-assets/dashboard.png";
import formImg from "../../assets/sidebar-assets/form.png";
import favoriteImg from "../../assets/sidebar-assets/favorite.png";

export default function SidebarComponent() {
    const [collapsed, setCollapsed] = useState(false);
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const location = useLocation();

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    const handleLogout = () => {
        logout();
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("refreshToken");
        navigate("/home");
    };

    const handleHomeClick = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigate("/home");
        }, 1500);
    };

    return (
        <div className="relative">
            {/* Loading Animation Overlay */}
            {loading && (
                <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-70 z-50">
                    <Lottie
                        animationData={loadingAnimation}
                        loop={true}
                        autoplay={true}
                        height={150}
                        width={150}
                    />
                </div>
            )}

            <div
                style={{
                    position: "fixed",
                    height: "100vh",
                    width: collapsed ? "100px" : "180px",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#FFBB00",
                    boxShadow: "0 0 30px rgba(0, 0, 0, 0.1)",
                    zIndex: 1000,
                }}
            >
                {/* Top Section */}
                <Sidebar
                    collapsed={collapsed}
                    backgroundColor="transparent"
                    width="100%"
                    collapsedWidth="100px"
                    transitionDuration={300}
                    style={{
                        flexGrow: 1,
                        overflowY: "auto",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    {/* Toggle Button */}
                    <button
                        onClick={toggleSidebar}
                        className="p-4 text-xl font-bold flex items-center justify-start hover:bg-towsonGoldLight w-full"
                        style={{ color: "#000000", textAlign: "left" }}
                    >
                        TAP
                    </button>

                    <Menu
                        menuItemStyles={{
                            button: ({ active }) => ({
                                backgroundColor: active
                                    ? "#FFE066"
                                    : "transparent",
                                color: active ? "#3C3C3C" : "#000000",
                                fontWeight: active ? "bold" : "normal",
                                padding: "12px 16px",
                                fontSize: "16px",
                            }),
                        }}
                    >
                        {/* Home Page */}
                        <MenuItem
                            active={location.pathname === "/home"}
                            onClick={handleHomeClick}
                        >
                            <img
                                src={homeImg}
                                alt="Home Icon"
                                className="inline-block mr-2 w-6 h-6"
                            />
                            {!collapsed && "Go Home"}
                        </MenuItem>

                        {/* Dashboard */}
                        <MenuItem
                            active={location.pathname === "/dashboard"}
                            component={<Link to="/dashboard" />}
                        >
                            <img
                                src={dashboardImg}
                                alt="Dashboard Icon"
                                className="inline-block mr-2 w-6 h-6"
                            />
                            {!collapsed && "Dashboard"}
                        </MenuItem>

                        {/* Favorites */}
                        <MenuItem
                            active={location.pathname === "/favorites"}
                            component={<Link to="/favorites" />}
                        >
                            <img
                                src={favoriteImg}
                                alt="Favorite Icon"
                                className="inline-block mr-2 w-6 h-6"
                            />
                            {!collapsed && "Favorites"}
                        </MenuItem>

                        {/* Requirements */}
                        <MenuItem
                            active={location.pathname === "/requirements"}
                            component={<Link to="/requirements" />}
                        >
                            <img
                                src={requirementsImg}
                                alt="Requirements Icon"
                                className="inline-block mr-2 w-6 h-6"
                            />
                            {!collapsed && "Requirements"}
                        </MenuItem>

                        {/* Form */}
                        <MenuItem
                            active={location.pathname === "/form"}
                            component={<Link to="/form" />}
                        >
                            <img
                                src={formImg}
                                alt="Form Icon"
                                className="inline-block mr-2 w-6 h-6"
                            />
                            {!collapsed && "Form"}
                        </MenuItem>
                    </Menu>
                </Sidebar>

                {/* Bottom Settings Section */}
                <div
                    style={{
                        borderTop: "1px solid #CCC",
                        padding: "16px",
                    }}
                >
                    <Menu
                        menuItemStyles={{
                            button: ({ active }) => ({
                                backgroundColor: active
                                    ? "#FFE066"
                                    : "transparent",
                                color: active ? "#3C3C3C" : "#000000",
                                fontWeight: active ? "bold" : "normal",
                                padding: "12px 16px",
                                fontSize: "16px",
                            }),
                        }}
                    >
                        <SubMenu
                            icon={
                                <img
                                    src={settingsImg}
                                    alt="Settings Icon"
                                    className="inline-block mr-2 w-6 h-6"
                                />
                            }
                            label={!collapsed && "Settings"}
                        >
                            <MenuItem
                                active={location.pathname === "/settings"}
                                component={<Link to="/settings" />}
                            >
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
                </div>
            </div>
        </div>
    );
}

import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomeComponent from "./components/home/HomeComponent";
import AboutComponent from "./components/about/AboutComponent";
import LoginComponent from "./components/auth/LoginComponent";
import RegisterComponent from "./components/auth/RegisterComponent";
import MainFormComponent from "./components/form/MainFormComponent";
import DashboardComponent from "./components/dashboard/DashboardComponent";
import SettingsComponent from "./components/settings/SettingsComponent";
import CourseCatalogComponent from "./components/course-catalog/CourseCatalogComponent";
import DegreeCompletionPlannerComponent from "./components/degree-completion-planner/DegreeCompletionPlannerComponent";
import AuthProvider from "./components/auth/AuthComponent";
import PublicLayout from "./layouts/PublicLayout";
import AuthenticatedLayout from "./layouts/AuthenticatedLayout";
import RequireAuth from "./components/auth/RequireAuth";

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* Public Routes */}
                    <Route element={<PublicLayout />}>
                        <Route path="/" element={<HomeComponent />} />
                        <Route path="/home" element={<HomeComponent />} />
                        <Route path="/about" element={<AboutComponent />} />
                        <Route path="/login" element={<LoginComponent />} />
                        <Route
                            path="/register"
                            element={<RegisterComponent />}
                        />
                    </Route>

                    {/* Authenticated Routes */}
                    <Route
                        element={
                            <RequireAuth>
                                <AuthenticatedLayout />
                            </RequireAuth>
                        }
                    >
                        <Route path="/form" element={<MainFormComponent />} />
                        <Route
                            path="/dashboard"
                            element={<DashboardComponent />}
                        />
                        <Route
                            path="/settings"
                            element={<SettingsComponent />}
                        />
                        <Route
                            path="/course-catalog"
                            element={<CourseCatalogComponent />}
                        />
                        <Route
                            path="/degree-planner"
                            element={<DegreeCompletionPlannerComponent />}
                        />
                    </Route>

                    {/* Catch-all Route */}
                    <Route path="*" element={<HomeComponent />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

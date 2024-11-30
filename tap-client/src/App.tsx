import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomeComponent from "./components/home/HomeComponent";
import AboutComponent from "./components/about/AboutComponent";
import LoginComponent from "./components/auth/LoginComponent";
import RegisterComponent from "./components/auth/RegisterComponent";
import MainFormComponent from "./components/form/MainFormComponent";
import SettingsComponent from "./components/settings/SettingsComponent";
import DashboardComponent from "./components/dashboard/DashboardComponent";
import AuthProvider from "./components/auth/AuthComponent";
import PublicLayout from "./layouts/PublicLayout";
import AuthenticatedLayout from "./layouts/AuthenticatedLayout";
import RequireAuth from "./components/auth/RequireAuth";
import RequirementsComponent from "./components/requirements/RequirementsComponent";
import MajorsListComponent from "./components/requirements/MajorsListComponent";
import MajorDetailComponent from "./components/requirements/MajorDetailComopnent";
import DegreeRequirementsComponent from "./components/requirements/DegreeRequirementsComponent";
import HonorsRequirementsComponent from "./components/requirements/HonorsRequirementComponent";

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
                        <Route
                            path="/dashboard"
                            element={<DashboardComponent />}
                        />
                        <Route path="/form" element={<MainFormComponent />} />
                        <Route
                            path="/settings"
                            element={<SettingsComponent />}
                        />
                        <Route
                            path="/requirements"
                            element={<RequirementsComponent />}
                        />
                        <Route
                            path="/requirements/majors"
                            element={<MajorsListComponent />}
                        />
                        <Route
                            path="/requirements/majors/:majorName"
                            element={<MajorDetailComponent />}
                        />
                        <Route
                            path="/requirements/degree"
                            element={<DegreeRequirementsComponent />}
                        />
                        <Route
                            path="/requirements/honors"
                            element={<HonorsRequirementsComponent />}
                        />
                    </Route>

                    {/* Catch-all route */}
                    <Route path="*" element={<HomeComponent />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

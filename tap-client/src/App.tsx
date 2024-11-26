import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomeComponent from "./components/home/HomeComponent";
import NavbarComponent from "./components/navbar/NavbarComponent";
import FooterComponent from "./components/footer/FooterComponent";
import LoginComponent from "./components/auth/LoginComponent";
import RegisterComponent from "./components/auth/RegisterComponent";
import AuthProvider from "./components/auth/AuthComponent";
import FormComponent from "./components/form/FormComponent";

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <NavbarComponent />
                <Routes>
                    <Route path="/home" element={<HomeComponent />} />
                    <Route path="/login" element={<LoginComponent />} />
                    <Route path="/register" element={<RegisterComponent />} />
                    <Route path="/form" element={<FormComponent />} />
                    <Route path="*" element={<HomeComponent />} />
                </Routes>
                <FooterComponent />
            </BrowserRouter>
        </AuthProvider>
    );
}

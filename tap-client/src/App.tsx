import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomeComponent from "./components/home/HomeComponent";
import NavbarComponent from "./components/navbar/NavbarComponent";
import FooterComponent from "./components/footer/FooterComponent";

export default function App() {
    return (
        <BrowserRouter>
            <NavbarComponent />
            <Routes>
                <Route path="/home" element={<HomeComponent />} />
                <Route path="*" element={<HomeComponent />} />
            </Routes>
            <FooterComponent /> 
        </BrowserRouter>
    );
}

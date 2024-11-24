// import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
// import HomeComponent from "./components/home/HomeComponent";
// import NavbarComponent from "./components/navbar/NavbarComponent";
// import FooterComponent from "./components/footer/FooterComponent";
// import LoginComponent from "./components/auth/LoginComponent";
// import RegisterComponent from "./components/auth/RegisterComponent";
// import AuthProvider from "./components/auth/AuthComponent";
// import OpenAITestComponent from "./components/OpenAITestComponent";
// import CourseTestComponent from "./components/CourseTestComponent";
import CoreTestComponent from "./components/CoreTestComponent";
import RequirementsTestComponent from "./components/RequirementsTestComponent";
import MajorTestComponent from "./components/MajorTestComponent";

export default function App() {
    return (
        <div>
            <CoreTestComponent />
            <br />
            <MajorTestComponent />
            <br />
            <RequirementsTestComponent />
            <br />
        </div>
        // <OpenAITestComponent />
        // <AuthProvider>
        //     <BrowserRouter>
        //         <NavbarComponent />
        //         <Routes>
        //             <Route path="/home" element={<HomeComponent />} />
        //             <Route path="/login" element={<LoginComponent />} />
        //             <Route path="/register" element={<RegisterComponent />} />
        //             <Route path="*" element={<HomeComponent />} />
        //         </Routes>
        //         <FooterComponent />
        //     </BrowserRouter>
        // </AuthProvider>
    );
}

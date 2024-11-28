import { Outlet } from "react-router-dom";
import NavbarComponent from "../components/navbar/NavbarComponent";
import FooterComponent from "../components/footer/FooterComponent";

export default function PublicLayout() {
    return (
        <>
            <NavbarComponent />
            <Outlet />
            <FooterComponent />
        </>
    );
}

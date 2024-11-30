import { Outlet } from "react-router-dom";
import NavbarComponent from "../components/navbar/NavbarComponent";
import FooterComponent from "../components/footer/FooterComponent";

export default function PublicLayout() {
    return (
        <div className="flex flex-col min-h-screen">
            <header>
                <NavbarComponent />
            </header>

            {/* Main content using vertical layout */}
            <main className="flex-grow">
                <Outlet />
            </main>

            <footer>
                <FooterComponent />
            </footer>
        </div>
    );
}

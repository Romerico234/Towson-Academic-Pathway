import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./AuthComponent";

export default function RequireAuth({ children }: { children: JSX.Element }) {
    const { token } = useContext(AuthContext);
    const location = useLocation();

    if (!token) {
        // Redirect to login page
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}

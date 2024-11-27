import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthComponent";

export default function RedirectIfAuthenticated({
    children,
}: {
    children: JSX.Element;
}) {
    const { token } = useContext(AuthContext);

    if (token) {
        // Redirect to form page or dashboard
        return <Navigate to="/form" replace />;
    }

    return children;
}

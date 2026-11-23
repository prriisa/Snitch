import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router";

const PrivateRoute = () => {
    const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
    const location = useLocation()

    if (isLoading) {
        return <div className="flex min-h-screen items-center justify-center bg-white text-sm uppercase tracking-widest">Loading account...</div>
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }} />;
};

export default PrivateRoute;
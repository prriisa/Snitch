import { Navigate, Outlet } from "react-router"
import { useSelector } from "react-redux"

const SellerRoute = () => {
    const user = useSelector((state) => state.auth.user)

    return user?.role === "seller" ? <Outlet /> : <Navigate to="/me" replace />
}

export default SellerRoute

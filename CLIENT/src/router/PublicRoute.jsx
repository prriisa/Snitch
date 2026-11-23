import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'

const PublicRoute = () => {
    const { isAuthenticated, isLoading } = useSelector((state) => state.auth)
    if (isLoading) return <Outlet />
    return isAuthenticated ? <Navigate to="/me" replace /> : <Outlet />
}

export default PublicRoute
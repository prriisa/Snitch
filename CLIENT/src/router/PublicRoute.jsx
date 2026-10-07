import React from 'react'
import { useSelector } from 'react-redux'

const PublicRoute = () => {

    const { isAuthenticated } = useSelector((state) => state.auth)
    return (
        !isAuthenticated ? <Outlet /> : <Navigate to="/" />
    )
}

export default PublicRoute
import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router'

const PublicRoute = () => {
    const Navigate = useNavigate()

    const { isAuthenticated } = useSelector((state) => state.auth)
    return (
        !isAuthenticated ? <Outlet /> : <Navigate to="/me" />
    )
}

export default PublicRoute
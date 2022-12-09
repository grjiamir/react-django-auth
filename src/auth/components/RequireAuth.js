import React from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLocation, Navigate, Outlet } from "react-router-dom"

/*
    Check user login and permissions
*/

function RequireAuth({ permissins = null }) {
    const { user, user_permissions } = useAuthContext()
    const location = useLocation()

    return (
        user?.isAuthenticated
            ? user_permissions !== 0
                ? user_permissions === "__all__" || permissins === null || user_permissions?.find(perm => permissins.includes(perm))
                    ? <Outlet />
                    : <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <></>
            : <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default RequireAuth
import React from 'react';
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ onLoggedIn, element: Component, ...props }) {
    return (
        onLoggedIn ? <Component {...props} /> : <Navigate to={'/sign-in'} replace></Navigate>
    )
}
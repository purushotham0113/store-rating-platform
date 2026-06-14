import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children, allowedRole }) => {

    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')

    if (!token) {
        // console.log("no token")
        return <Navigate to="/login" />
    }

    if (allowedRole && role !== allowedRole) {
        // console.log("not allowed")
        return <Navigate to="/login" />
    }
    // console.log("ok ")

    return children
}

export default ProtectedRoute
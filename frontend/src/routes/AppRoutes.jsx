import { Routes, Route } from 'react-router-dom'
import Login from '../pages/auth/Login'
import Signup from '../pages/auth/Signup'
import CreateUser from '../pages/admin/CreateUsers'

import Dashboard from '../pages/admin/Dashboard'
import Users from '../pages/admin/Users'
import Stores from '../pages/admin/Stores'
import CreateStore from '../pages/admin/CreateStore'
import UserStores from '../pages/user/Stores'
import OwnerDashboard from '../pages/owner/Dashboard'
import ChangePassword from '../pages/auth/ChangePassword'
import UserDetails from '../pages/user/UserDetails'

import Layout from '../components/Layout'

// import Ratings from '../pages/owner/Ratings'

import ProtectedRoute from '../components/ProtectedRoute'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path='/change-password' element={<ChangePassword />} />
            <Route element={<Layout />}>

                <Route path="/admin/dashboard" element={
                    <ProtectedRoute allowedRole="ADMIN">
                        <Dashboard />
                    </ProtectedRoute>
                }
                />
                <Route path='/admin/users/:id' element={
                    <ProtectedRoute allowedRole='ADMIN'>
                        <UserDetails />

                    </ProtectedRoute>

                }
                />

                <Route path="/admin/users" element={
                    <ProtectedRoute allowedRole="ADMIN">
                        <Users />
                    </ProtectedRoute>
                }
                />
                <Route path='/admin/create-user' element={
                    <ProtectedRoute allowedRole="ADMIN">
                        <CreateUser />

                    </ProtectedRoute>
                }
                />
                <Route path='/admin/stores' element={
                    <ProtectedRoute allowedRole="ADMIN">
                        <Stores />
                    </ProtectedRoute>
                }
                />
                <Route path='/admin/create-store' element={
                    <ProtectedRoute allowedRole="ADMIN">
                        <CreateStore />
                    </ProtectedRoute>
                }
                />


                <Route path='/user/stores' element={
                    <ProtectedRoute allowedRole="USER">
                        <UserStores />
                    </ProtectedRoute>
                }
                />


                <Route path='/owner/dashboard' element={
                    <ProtectedRoute allowedRole="STORE_OWNER">
                        <OwnerDashboard />
                    </ProtectedRoute>
                }
                />
            </Route>

        </Routes>
    )
}

export default AppRoutes
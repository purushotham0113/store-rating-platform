import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
    const navigate = useNavigate()
    const role = localStorage.getItem('role')
    const handleLogout = () => {

        localStorage.removeItem('token')
        localStorage.removeItem('role')

        navigate('/login')
    }

    return (
        <div className="navbar">
            <h2>Store Rating Platform</h2>
            <div className="nav-links">
                {
                    role === 'ADMIN' &&
                    <>
                        <Link to="/admin/dashboard">
                            Dashboard
                        </Link>

                        <Link to="/admin/users">
                            Users
                        </Link>

                        <Link to="/admin/stores">
                            Stores
                        </Link>

                        <Link to='/admin/create-user'>
                            Add User
                        </Link>

                        <Link to='/admin/create-store'>
                            Add Store

                        </Link>
                    </>
                }

                {
                    role === 'USER' &&
                    <>
                        <Link to="/user/stores">
                            Stores
                        </Link>

                        <Link to="/change-password">
                            Change Password
                        </Link>
                    </>
                }

                {
                    role === 'STORE_OWNER' &&
                    <>
                        <Link to="/owner/dashboard">
                            Dashboard
                        </Link>

                        <Link to="/change-password">
                            Change Password
                        </Link>
                    </>
                }

                <button
                    onClick={handleLogout}
                    className="logout-btn"
                >
                    Logout
                </button>

            </div>

        </div>
    )
}

export default Navbar
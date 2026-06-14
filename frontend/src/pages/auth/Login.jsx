import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useState, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import api from '../../api/axios'
import './Login.css'



export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { login } = useContext(AuthContext)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await api.post('/auth/login', formData)
            // console.log(response)
            login(response.data.jwt, response.data.role)
            // console.log("after login")
            const role = response.data.role;

            if (role == 'ADMIN') {

                navigate('/admin/dashboard')
            }
            if (role == 'STORE_OWNER') {
                navigate('/owner/dashboard')

            }
            if (role == 'USER') {
                navigate('/user/stores')
            }

        } catch (err) {
            // console.log(err);
            alert(`${err.response.data.message}`)

        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='login-container'>
            <form className='login-form' onSubmit={handleSubmit}>
                <h2>Login</h2>
                <input type='email' name='email' placeholder='Email' value={formData.email} onChange={handleChange} />
                <input type='password' name='password' placeholder='password' value={formData.password} onChange={handleChange} />
                <button disabled={loading}>{loading ? 'loading...' : 'Login'}</button>

                <p className='login-link'>
                    Don't have an account?{' '}
                    <Link to='/signup'>Signup</Link>
                </p>
            </form>


        </div>
    )
}







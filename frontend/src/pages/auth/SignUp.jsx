import React, { useState } from 'react'
import api from '../../api/axios.js'
import './SignUp.css'
import { useNavigate, Link } from 'react-router-dom'

export default function SignUp() {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        password: ''
    })

    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (formData.name.length < 5 || formData.name.length > 60) {
            return alert('Name must be between 5 and 60 characters')
        }

        if (formData.address.length > 400) {
            return alert('Address cannot exceed 400 characters')
        }

        const passwordRegex =
            /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,16}$/

        if (!passwordRegex.test(formData.password)) {
            return alert(
                'Password must be 8-16 characters and contain one uppercase letter and one special character'
            )
        }

        try {

            setLoading(true)

            const response = await api.post(
                '/auth/register',
                formData
            )

            alert(response.data.message)

            navigate('/login')

        } catch (err) {

            console.log(err)

            alert(
                err?.response?.data?.message ||
                'Registration failed'
            )

        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='signup-container'>

            <form
                className='signup-form'
                onSubmit={handleSubmit}
            >

                <h2>Sign-Up</h2>

                <input
                    type='text'
                    name='name'
                    placeholder='Name'
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <input
                    type='email'
                    name='email'
                    placeholder='Email'
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type='text'
                    name='address'
                    placeholder='Address'
                    value={formData.address}
                    onChange={handleChange}
                    required
                />

                <input
                    type='password'
                    name='password'
                    placeholder='Password'
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <button disabled={loading}>
                    {loading ? 'Loading...' : 'Sign Up'}
                </button>

                <p className='login-link'>
                    Already have an account?{' '}
                    <Link to='/login'>Login</Link>
                </p>

            </form>

        </div>
    )
}
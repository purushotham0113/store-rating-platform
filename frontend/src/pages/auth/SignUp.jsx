import React from 'react'
import { useState } from 'react'
import api from '../../api/axios.js'
import './SignUp.css'


export default function SignUp() {
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
        if (formData.name.length < 20 || formData.name.length > 60) {
            return alert('Name must be between 20 and 60 characters')
        }

        if (formData.address.length > 400) {
            return alert('Address cannot exceed 400 characters')
        }
        try {

            setLoading(true);

            const response = await api.post('auth/register', formData)
            // console.log(response)
            alert(`${response.data.message}`)

        } catch (err) {
            alert(`${err.response.data.message}`)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='signup-container'>
            <form className='signup-form' onSubmit={handleSubmit}>
                <h2>Sign-Up</h2>
                <input type='text' name='name' placeholder='Name' value={formData.name} onChange={handleChange} />
                <input type='email' name='email' placeholder='Email' value={formData.email} onChange={handleChange} />
                <input type='text' name='address' placeholder='Address' value={formData.address} onChange={handleChange} />
                <input type='password' name='password' placeholder='Password' value={formData.password} onChange={handleChange} />
                <button disabled={loading}>{loading ? 'loading...' : 'SignUp'}</button>
            </form>

        </div>
    )
}

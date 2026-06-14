import { useState } from 'react'
import api from '../../api/axios'
import './ChangePassword.css'

const ChangePassword = () => {

    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (formData.newPassword !== formData.confirmPassword) {
            return alert('Passwords do not match')
        }

        const passwordRegex =
            /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,16}$/

        if (!passwordRegex.test(formData.newPassword)) {
            return alert(
                'Password must be 8-16 characters and contain one uppercase letter and one special character'
            )
        }

        try {

            const response = await api.put('/user/changepass', {
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword
            })

            alert(response.data.message)

            setFormData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            })

        } catch (err) {

            alert(
                err.response?.data?.message ||
                'Failed to change password'
            )
        }
    }

    return (
        <div className="change-password-container">

            <form
                className="change-password-form"
                onSubmit={handleSubmit}
            >

                <h2>Change Password</h2>

                <input type="password" name="currentPassword" placeholder="Current Password" value={formData.currentPassword} onChange={handleChange} required />

                <input type="password" name="newPassword" placeholder="New Password" value={formData.newPassword} onChange={handleChange} required />

                <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
                <button>
                    Update Password
                </button>

            </form>

        </div>
    )
}

export default ChangePassword
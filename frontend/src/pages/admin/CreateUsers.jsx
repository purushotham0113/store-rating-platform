import { useState } from 'react'
import api from '../../api/axios'
import './CreateUsers.css'

const CreateUser = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        password: '',
        role: 'USER'
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
            return alert('Address must be less than 400 characters')
        }
        if (formData.password.length < 8 || formData.password.length > 16) {
            return alert('Password must be between 8 and 16 characters')
        }
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).+$/
        if (!passwordRegex.test(formData.password)) {
            return alert('Password must contain at least one uppercase letter and one special character')
        }
        try {
            setLoading(true)


            const response = await api.post('/admin/users', formData)
            alert(response.data.message)

            setFormData({
                name: '',
                email: '',
                address: '',
                password: '',
                role: 'USER'
            })

        } catch (err) {

            alert(
                err.response?.data?.message ||
                'Failed to create user'
            )

        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="create-user-container">

            <form className="create-user-form" onSubmit={handleSubmit} >
                <h2>Create User</h2>
                <input type="text" name="name" placeholder="Enter Name" value={formData.name} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Enter Email" value={formData.email} onChange={handleChange} required />

                <textarea name="address" placeholder="Enter Address" value={formData.address} onChange={handleChange} rows="4" required />
                <input type="password" name="password" placeholder="Enter Password" value={formData.password} onChange={handleChange} required />

                <select name="role" value={formData.role} onChange={handleChange}>
                    <option value="USER">USER</option>
                    <option value="STORE_OWNER">STORE_OWNER</option>
                    <option value="ADMIN">ADMIN</option>
                </select>

                <button disabled={loading}>{loading ? 'loading...' : 'Create User'}</button>


            </form>



        </div>
    )
}

export default CreateUser
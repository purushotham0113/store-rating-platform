import { useEffect, useState } from 'react'
import api from '../../api/axios'
import './CreateStore.css'

const CreateStore = () => {
    const [owners, setOwners] = useState([])
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        ownerId: ''
    })


    const fetchOwners = async () => {
        try {
            const response = await api.get('/admin/store-less')
            const storeOwners = response.data.users

            setOwners(storeOwners)

        } catch (err) {
            console.error(err)
        }
    }
    useEffect(() => {
        fetchOwners()
    }, [])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await api.post('/admin/store', formData)
            // console.log("inside")

            alert(response.data.message)

            setFormData({
                name: '',
                email: '',
                address: '',
                ownerId: ''
            })

        } catch (err) {
            alert(
                err.response?.data?.message ||
                'Failed to create store'
            )
        }
    }

    return (
        <div className="create-store-container">

            <form className="create-store-form" onSubmit={handleSubmit}>
                <h2>Create Store</h2>

                <input type="text" name="name" placeholder="Store Name" value={formData.name} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Store Email" value={formData.email} onChange={handleChange} required />

                <textarea name="address" placeholder="Store Address" value={formData.address} onChange={handleChange} rows="4" required />
                <select name="ownerId" value={formData.ownerId} onChange={handleChange} required>
                    <option value="">Select Store Owner</option>
                    {
                        owners.map((owner) => (
                            <option key={owner.id} value={owner.id}>{owner.name}</option>
                        ))
                    }
                </select>

                <button>Create Store</button>

            </form>

        </div>
    )
}

export default CreateStore
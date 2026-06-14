import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../api/axios'
import './UserDetails.css'

const UserDetails = () => {
    const { id } = useParams()

    const [user, setUser] = useState(null)
    const fetchUser = async () => {
        try {

            const response = await api.get(
                `/admin/users/${id}`
            )

            setUser(response.data.user)

        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    if (!user) {
        return <h2>Loading...</h2>
    }

    return (
        <div className="user-details">

            <h2>User Details</h2>
            <div className="detail-row">
                <strong>ID :</strong>
                <span>{id}</span>
            </div>
            <div className="detail-row">
                <strong>Name :</strong>
                <span>{user.name}</span>
            </div>

            <div className="detail-row">
                <strong>Email :</strong>
                <span>{user.email}</span>
            </div>

            <div className="detail-row">
                <strong>Address :</strong>
                <span>{user.address}</span>
            </div>

            <div className="detail-row">
                <strong>Role :</strong>
                <span>{user.role}</span>
            </div>

        </div>
    )
}

export default UserDetails
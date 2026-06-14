import { useEffect, useState } from 'react'
import api from '../../api/axios'
import './Dashboard.css'

const Dashboard = () => {
    const [averageRating, setAverageRating] = useState(0)
    const [users, setUsers] = useState([])

    const fetchAverageRating = async () => {
        try {
            const response = await api.get('/store-owner/rating')
            setAverageRating(response.data.rating)

        } catch (err) {
            console.error(err)
        }
    }

    const fetchUsers = async () => {
        try {
            const response = await api.get('/store-owner/users')
            setUsers(response.data.users)

        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchAverageRating()
        fetchUsers()
    }, [])



    return (
        <div className="owner-dashboard">

            <h2>Store Owner Dashboard</h2>

            <div className="rating-card">
                <h3>Average Rating</h3>
                <p>{averageRating}</p>
            </div>

            <div className="ratings-section">

                <h3>Users Who Rated Your Store</h3>

                <div className="user-row header">
                    <div>No</div>
                    <div>Name</div>
                    <div>Email</div>
                    <div>Rating</div>
                </div>

                {
                    users.map((user, index) => (
                        <div
                            key={user.id}
                            className="user-row"
                        >
                            <div>{index + 1}</div>
                            <div>{user.name}</div>
                            <div>{user.email}</div>
                            <div>{user.rating}</div>
                        </div>
                    ))
                }

            </div>

        </div>
    )
}

export default Dashboard
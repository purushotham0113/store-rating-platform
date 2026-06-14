import { useEffect, useState } from 'react'
import api from '../../api/axios'
import './Dashboard.css'

const Dashboard = () => {
    const [dashboard, setDashboard] = useState({
        users: 0,
        stores: 0,
        ratings: 0
    })
    const fetchDashboard = async () => {
        try {
            const res = await api.get('/admin/dashboard')
            setDashboard({
                users: res.data.users,
                stores: res.data.stores,
                ratings: res.data.ratings
            })
        } catch (err) {
            console.error(err)
            alert(`${err.response.data.message}`)


        }
    }

    useEffect(() => {
        fetchDashboard()
    }, [])

    return (
        <div className="dashboard-container">


            <h2>Admin Dashboard</h2>

            <div className="dashboard-cards">

                <div className="card">
                    <h3>Total Users</h3>
                    <p>{dashboard.users}</p>
                </div>

                <div className="card">
                    <h3>Total Stores</h3>
                    <p>{dashboard.stores}</p>
                </div>

                <div className="card">
                    <h3>Total Ratings</h3>
                    <p>{dashboard.ratings}</p>
                </div>

            </div>

        </div>
    )
}

export default Dashboard
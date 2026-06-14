import React from 'react'
import api from '../../api/axios'
import { useState, useEffect } from 'react'
import './Users.css'
import { useNavigate } from 'react-router-dom'


export default function Users() {

    const [users, setUsers] = useState([])
    const [search, setSearch] = useState('')

    const fetchUsers = async () => {
        // console.log("in users")
        try {
            const res = await api.get('/admin/users')
            setUsers(res.data.users)

        } catch (err) {
            console.error(err);
        }
    }
    useEffect(() => {
        fetchUsers();

    }, [])

    const filteredUsers = users.filter((user) => {
        return user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase()) ||
            user.address.toLowerCase().includes(search.toLowerCase())
    })
    const navigate = useNavigate()



    return (
        <div className='users-container'>
            <h2>Users</h2>

            <input
                type="text"
                placeholder="Search user"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
            />

            <table>

                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Role</th>
                        <th>view</th>
                    </tr>
                </thead>

                <tbody>

                    {
                        filteredUsers.map((user) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.address}</td>
                                <td>{user.role}</td>
                                <td>
                                    <button onClick={() => navigate(`/admin/users/${user.id}`)}>+</button>
                                </td>

                            </tr>
                        ))
                    }

                </tbody>

            </table>

        </div>
    )
}

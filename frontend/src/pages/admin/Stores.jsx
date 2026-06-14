import { useEffect, useState } from 'react'
import api from '../../api/axios'
import './Stores.css'

const Stores = () => {
    const [stores, setStores] = useState([])
    const [search, setSearch] = useState('')
    const fetchStores = async () => {
        try {
            const response = await api.get('/admin/stores')
            setStores(response.data.stores)
            // console.log(response.data)

        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchStores()
    }, [])

    const filteredStores = stores.filter((store) =>
        store.name.toLowerCase().includes(search.toLowerCase()) ||
        store.email.toLowerCase().includes(search.toLowerCase()) ||
        store.address.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="stores-container">
            <h2>Stores</h2>

            <input type="text" placeholder="Search Store" value={search} onChange={(e) => setSearch(e.target.value)} className="search-input" />
            <div className="store-row header">
                <div>No</div>
                <div>Store Name</div>
                <div>Email</div>
                <div>Address</div>
                <div>Rating</div>
            </div>
            {
                filteredStores.map((store, index) => (
                    <div
                        key={store.id}
                        className="store-row"
                    >
                        <div>{index + 1}</div>
                        <div>{store.name}</div>
                        <div>{store.email}</div>
                        <div>{store.address}</div>
                        <div>{store.rating}</div>
                    </div>
                ))
            }
        </div>
    )
}

export default Stores
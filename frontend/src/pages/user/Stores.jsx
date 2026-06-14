import { useEffect, useState } from 'react'
import api from '../../api/axios'
import './Stores.css'
import { useNavigate } from 'react-router-dom'

const Stores = () => {
    // console.log("in stores")
    const [stores, setStores] = useState([])
    const [search, setSearch] = useState('')
    const fetchStores = async () => {
        try {

            const response = await api.get('/stores')
            setStores(response.data.stores)
            // console.log(response.data.stores)

        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchStores()
    }, [])

    const handleRating = async (storeId, rating) => {
        try {

            await api.post('/ratings/submit', {
                storeId,
                rating
            })

            alert('Rating submitted')

            fetchStores()

        } catch (err) {
            console.error(err)
        }
    }

    const filteredStores = stores.filter((store) =>
        store.name.toLowerCase().includes(search.toLowerCase()) ||
        store.address.toLowerCase().includes(search.toLowerCase())
    )
    const navigate = useNavigate()


    return (
        <div className="stores-container">
            <h2>Stores</h2>

            <input
                type="text"
                placeholder="Search store"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
            />

            <div className="store-row header">
                <div>No</div>
                <div>Name</div>
                <div>Address</div>
                <div>Average Rating</div>
                <div>Your Rating</div>
            </div>

            {
                filteredStores.map((store, index) => (
                    <div
                        key={store.id}
                        className="store-row"
                    >
                        <div>{index + 1}</div>
                        <div>{store.name}</div>
                        <div>{store.address}</div>
                        <div>{store.averageRating}</div>

                        <div className='container'>

                            <div className='box1'>
                                <strong>{store.UserRating}</strong>
                            </div>
                            <select
                                value=''
                                onChange={(e) =>
                                    handleRating(
                                        store.id,
                                        Number(e.target.value)
                                    )
                                }
                                className='box2'
                            >
                                <option value="">
                                    Rate
                                </option>

                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>

                            </select>


                        </div>

                    </div>
                ))
            }

        </div>
    )
}

export default Stores
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

import authRoutes from './routes/auth.js'
import userRoutes from './routes/userRoutes.js'
import storeRoutes from './routes/storeRoutes.js'
import ratingRoutes from './routes/ratingRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import db from './config/db.js'

const app = express()
app.use(express.json())
app.use(cors());


const PORT = process.env.PORT

app.get('/api/health', async (req, res) => {
    try {
        const [result] = await db.query('SELECT 1');
        return res.status(200).json({
            message: "Server is live",
            database: 'Connected'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Database connection Failed !"
        })
    }
})

// auth
app.use('/api/auth', authRoutes)

//userRoutes
app.use('/api/user', userRoutes)

//StoreRoutes
app.use('/api/stores', storeRoutes)

//RatingRoutes
app.use('/api/ratings', ratingRoutes)

//AdminRoutes
app.use('/api/admin', adminRoutes)

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal server error"
    })
})


app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`)
})

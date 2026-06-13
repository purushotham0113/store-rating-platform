import express from 'express'
import { register, login } from '../controllers/authControllers.js'
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router()

router.post('/user/register', register);
router.post('/user/login', login)

router.get('/check', authMiddleware, (req, res) => {
    try {
        return res.json({
            success: true,
            message: "midlleware working fine",
            user: req.user
        })
    } catch (err) {
        console.error(err);
        return res.status(400).json({
            success: false

        })
    }
})

export default router
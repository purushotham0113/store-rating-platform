import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';
import { dashboard, createUser, getUsers, getUserById, search, getStores } from '../controllers/adminControllers.js';

const router = express.Router()

router.get('/dashboard', authMiddleware, roleMiddleware('ADMIN'), dashboard)
router.get('/users', authMiddleware, roleMiddleware('ADMIN'), getUsers)
router.get('/users/:id', authMiddleware, roleMiddleware('ADMIN'), getUserById)
router.get('/search', authMiddleware, roleMiddleware('ADMIN'), search)
router.get('/stores', authMiddleware, roleMiddleware('ADMIN'), getStores)


router.post('/users', authMiddleware, roleMiddleware('ADMIN'), createUser)



export default router
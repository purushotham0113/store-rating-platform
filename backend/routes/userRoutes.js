import express from 'express'
const router = express.Router();

import authMiddleware from '../middlewares/authMiddleware.js';
import { getMe, changePassword } from '../controllers/userControllers.js';

router.get('/me', authMiddleware, getMe)
router.put('/changepass', authMiddleware, changePassword)

export default router

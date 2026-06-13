import express from 'express'
const router = express.Router();

import { getStores, searchStores } from '../controllers/storeControllers.js';
import authMiddleware from '../middlewares/authMiddleware.js';


router.get('/', authMiddleware, getStores)
router.get('/search', authMiddleware, searchStores)

export default router;
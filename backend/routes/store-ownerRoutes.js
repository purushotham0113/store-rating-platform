import express from 'express'
const router = express.Router();

import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';
import { getUsers, rating } from '../controllers/store-ownerControllers.js';

router.get('/users', authMiddleware, roleMiddleware('STORE_OWNER'), getUsers)
router.get('/rating', authMiddleware, roleMiddleware("STORE_OWNER"), rating)


export default router;
import express from 'express'
const router = express.Router();

import authMiddleware from '../middlewares/authMiddleware.js';
import { submitRating } from '../controllers/ratingControllers.js';

router.post('/submit', authMiddleware, submitRating)


export default router

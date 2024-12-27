import express from 'express';
import { verifyEmail } from '../controllers/EmailVerification.js';
const router = express.Router();


router.get('/verify-email/:userId/:token', verifyEmail); // Updated route

export default router;
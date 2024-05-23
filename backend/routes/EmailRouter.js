// routes/emailRoutes.js
import express from 'express';
import { sendEmailsToAllUsers } from '../controllers/EmailController.js';

const router = express.Router();

router.post('/sendEmailsToAllUsers', sendEmailsToAllUsers);

export default router;

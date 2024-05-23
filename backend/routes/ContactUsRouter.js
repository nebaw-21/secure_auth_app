// routes/blogRoutes.js
import express from 'express';
import { createMessage, getMessages, getMessageById, deleteMessage } from '../controllers/ContactUsController.js';

const router = express.Router();

router.post('/', createMessage);
router.get('/', getMessages);
router.get('/:id', getMessageById);
router.delete('/:id', deleteMessage);

export default router;

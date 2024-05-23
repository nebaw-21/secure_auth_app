// routes/blogRoutes.js
import express from 'express';
import { createEvent, getEvents, getEventById, updateEvent } from '../controllers/EventController.js';

const router = express.Router();

router.post('/', createEvent);
router.get('/', getEvents);
router.get('/:id', getEventById);
router.put('/:id', updateEvent);
// router.delete('/:id', deleteEvent);

export default router;

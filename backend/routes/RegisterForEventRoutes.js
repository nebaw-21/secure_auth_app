// routes/registerForEventRoutes.js
import express from 'express';
import { createRegistration, getEvents, getUsersByEventId } from '../controllers/RegisterForEventController.js';

const router = express.Router();

router.post('/', createRegistration);
router.get('/events', getEvents);
router.get('/users/:event_id', getUsersByEventId);

export default router;

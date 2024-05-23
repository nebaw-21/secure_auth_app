// routes/subscribedUserRoutes.js
import express from 'express';
import { createSubscribedUser, getSubscribedUsers, getSubscribedUserById, updateSubscribedUser, deleteSubscribedUser } from '../controllers/subscribedUserController.js';

const router = express.Router();

router.post('/', createSubscribedUser);
router.get('/', getSubscribedUsers);
router.get('/:id', getSubscribedUserById);
router.put('/:id', updateSubscribedUser);
router.delete('/:id', deleteSubscribedUser);

export default router;

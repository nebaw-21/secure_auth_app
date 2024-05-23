import express from 'express';
import { registerUser, loginUser, getUser, getAllUsers, deleteUser,getUserById,updateUser} from '../controllers/UserController.js';
const router = express.Router();

// Define route handlers
 router.get('/', getAllUsers);
 router.post('/register', registerUser);
 router.post('/login', loginUser);
router.get('/getUser', getUser);
router.delete('/:id', deleteUser);
router.get('/:id', getUserById);
router.put('/:id', updateUser);

export default router;

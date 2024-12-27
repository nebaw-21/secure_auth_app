import express from 'express';
import { registerUser, loginUserWithOTP,verifyOTP, getUser, getAllUsers, deleteUser,getUserById,updateUser} from '../controllers/UserController.js';
const router = express.Router();

// Define route handlers
 router.get('/', getAllUsers);
 router.post('/register', registerUser);
 //router.post('/login', loginUser);
 router.get('/getUser', getUser);
 router.delete('/:id', deleteUser);
 router.get('/:id', getUserById);
 router.put('/:id', updateUser);
 router.post("/login/otp", loginUserWithOTP);
 router.post("/login/otp/verify", verifyOTP);



export default router;

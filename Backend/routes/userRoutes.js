import express from 'express';
import { authUser, getUserById, registerUser } from '../controllers/userController.js';
import { protect, checkUser, userExists } from '../middleware/authMiddleware.js';
import { loginValidation, registerValidation } from '../middleware/validationMiddleware.js';

const router = express.Router();

router.post('/login', loginValidation, authUser);
router.post('/register', registerValidation, userExists, registerUser)
router.get('/:id', protect, checkUser, getUserById)

export default router
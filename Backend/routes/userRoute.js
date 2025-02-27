import express from 'express';
import { register, login, getProfile } from '../controllers/userController.js';
import { authenticate } from '../middleware/auth.js';
import { validateUserRegistration } from '../middleware/validation.js';

const router = express.Router();

router.post('/register', validateUserRegistration, register);
router.post('/login', login);

router.get('/profile', authenticate, getProfile);

export default router;
import express from 'express';
import { register, login, getProfile } from '../controllers/userController.js';
import { authenticate } from '../middleware/auth.js';
import { validateUserLogin, validateUserRegistration } from '../middleware/validation.js';

const router = express.Router();

router.post('/register', validateUserRegistration, register);
router.post('/login', validateUserLogin, login);

router.get('/profile', authenticate, getProfile);

export default router;
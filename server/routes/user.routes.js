import express from 'express';
import { body } from 'express-validator';
import { registerUser, loginUser, getProfile, logoutUser } from '../controllers/user.controller.js';
import { authUser } from '../middleware/auth.middleware.js';

const router = express.Router();

// Register a new user
router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Invalid email address'),
    body('fullname.firstname')
      .isLength({ min: 3 })
      .withMessage('First name must be at least 3 characters long'),
    body('password')
      .isLength({ min: 5 })
      .withMessage('Password must be at least 5 characters long'),
  ],
  registerUser
);

// Login existing user
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Invalid email'),
    body('password')
      .isLength({ min: 5 })
      .withMessage('Password must be at least 5 characters long'),
  ],
  loginUser
);

// Get user profile (protected route)
router.get('/profile', authUser, getProfile);

// Logout user
router.get('/logout', authUser, logoutUser);

export default router;

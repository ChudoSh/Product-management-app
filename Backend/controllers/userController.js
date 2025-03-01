import User from '../models/user.js';
import { generateToken } from '../config/auth.js';
import { ValidationError } from '../utils/errorHandler.js';

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return next(new ValidationError('Email already registered' ));
    }
    
    const user = await User.create(name, email, password);
    
    const token = generateToken(user.id);
    
    res.status(201).json({
      message: 'User registered successfully',
      user: user.toJSON(),
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    
    const user = await User.findByEmail(email);
    if (!user) {
      return next(new ValidationError('Invalid credentials'));
    }
    
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return next(new ValidationError('Invalid credentials'));
    }
    
    const token = generateToken(user.id);
    
    res.status(200).json({
      message: 'Login successful',
      user: user.toJSON(),
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

export const getProfile = async (req, res) => {
  try {
    res.status(200).json({
      message: 'Profile retrieved successfully',
      user: req.user.toJSON()
    });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ message: 'Server error retrieving profile' });
  }
};
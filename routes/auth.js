const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Register endpoint
router.post('/register', async (req, res) => {
  try {
    const { email, password, companyName, firstName, lastName, telNo } = req.body;
    
    // Validation
    if (!email || !password) {
      return res.status(400).json({ 
        message: 'Email and password are required',
        errors: [{ key: 'email', message: 'Email and password are required' }]
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        message: 'User already exists with this email',
        errors: [{ key: 'email', message: 'User already exists' }]
      });
    }

    // Create new user
    const user = new User({ 
      email, 
      password, 
      companyName, 
      firstName, 
      lastName, 
      telNo 
    });
    
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email }, 
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({ 
      token,
      message: 'Registration successful',
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.keys(error.errors).map(key => ({
        key,
        message: error.errors[key].message
      }));
      return res.status(400).json({ message: 'Validation error', errors });
    }
    
    res.status(500).json({ 
      message: 'Server error during registration',
      error: error.message 
    });
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email }, 
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ 
      token,
      message: 'Login successful',
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      message: 'Server error during login',
      error: error.message 
    });
  }
});

module.exports = router;


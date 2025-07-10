const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Login controller
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // 1. Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // 2. Validate password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // 3. Create JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // 4. Send response
    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Register controller
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    // 1. Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // 2. Create new user (password will be hashed by pre-save hook)
    user = new User({ name, email, password });
    await user.save();

    // 3. Create JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // 4. Send response
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      }
    });
  } catch (err) {
    console.error('Registration error:', err);
    
    // Handle validation errors
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    
    res.status(500).json({ message: 'Server error' });
  }
};

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// controllers/authController.js

// Register a new user
exports.register = async (req, res) => {
  const { username, password, isAdmin } = req.body;
  try {
    const existing = await User.findOne({ username });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const password_hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, password_hash, isAdmin });

    res.status(201).json({ message: 'Registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Login user
exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id,username:user.username , isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    res.json({ token, isAdmin: user.isAdmin });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
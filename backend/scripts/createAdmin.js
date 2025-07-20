// scripts/createAdmin.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // adjust path as needed

dotenv.config();

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existing = await User.findOne({ username: 'admin' });
    if (existing) {
      console.log('Admin already exists');
      process.exit();
    }

    const password_hash = await bcrypt.hash('admin123', 10);

    const admin = new User({
      username: 'admin',
      password_hash,
      isAdmin: true
    });

    await admin.save();
    console.log('Admin user created successfully!');
    process.exit();
  } catch (err) {
    console.error('Error creating admin user:', err.message);
    process.exit(1);
  }
}

createAdmin();

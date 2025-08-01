// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password_hash: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('User', userSchema);

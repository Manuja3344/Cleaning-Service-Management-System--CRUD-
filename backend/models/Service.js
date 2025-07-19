const mongoose = require('mongoose');

// models/Service.js
const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    
      }
    });
    module.exports = mongoose.model('Service', serviceSchema);
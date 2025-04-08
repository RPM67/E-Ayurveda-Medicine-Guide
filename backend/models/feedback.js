const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  medicineName: { 
    type: String, 
    required: true,
    ref: 'Medicine'
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  comment: { 
    type: String, 
    required: true,
    minLength: 3,
    maxLength: 500
  },
  rating: { 
    type: Number, 
    min: 1, 
    max: 5, 
    required: true 
  }
}, { timestamps: true });

module.exports = mongoose.model('Feedback', feedbackSchema);
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  replied: {
    type: Boolean,
    default: false
  },
  reply: {
    type: String
  },
  readed: {
    type: Boolean,
    default: false
  },
  replied_on: {
    type: Date
  },
  replied_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'  // Reference to the User model
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;

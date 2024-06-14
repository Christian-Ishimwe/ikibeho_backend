const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  type: { type: String, required: true },
  details: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String},
    amount: { type: Number },
    availability: { type: String },
    volunteerType: { type: String },
    date: { type: Date },
  },
  delivered: { type: Boolean, default: false },
  date: { type: Date, required: true },
});

const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;

const mongoose = require('mongoose');

const DATABASE_URL = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/ikibeho";

const dbConfig = async () => {
  try {
    await mongoose.connect(DATABASE_URL);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

module.exports = dbConfig;

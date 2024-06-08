const mongoose = require('mongoose');
const options = {

    serverSelectionTimeoutMS: 50000, // Timeout for server selection
    socketTimeoutMS: 45000, // Timeout for I/O operations
};
const DATABASE_URL = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/ikibeho";

const dbConfig = async () => {
  try {
    await mongoose.connect(DATABASE_URL, options);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

module.exports = dbConfig;

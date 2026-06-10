const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/event-management', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Fail fast if MongoDB unreachable
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    console.error('⚠️  Server running WITHOUT database. API calls will fail until MongoDB is reachable.');
    console.error('   → Set MONGODB_URI in server/.env to a valid MongoDB Atlas URI to fix this.');
    // Do NOT exit — let the server start so at least the client files are served
  }
};

module.exports = connectDB;

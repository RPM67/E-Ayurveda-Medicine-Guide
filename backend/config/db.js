require('dotenv').config();
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

async function connectDb() {
    try {
        await mongoose.connect(MONGO_URI, {
            connectTimeoutMS: 10000, // 10s timeout
            serverSelectionTimeoutMS: 5000, // Prevents long initial waits
        });
        console.log("MongoDB connected successfully!");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1);
    }
}

module.exports = connectDb;
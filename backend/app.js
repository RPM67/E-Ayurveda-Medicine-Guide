const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const fs = require('fs');

const uploadDir = 'uploads/medicines';
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, { recursive: true });
}

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Configure Middlewares
app.use(express.json());
app.use(express.urlencoded({'extended':true}));

// Simplified session configuration for development
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI
  }),
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  }
}));

app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/diseases', require('./routes/diseaseRoutes'));
app.use('/api/medicines', require('./routes/medicineRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/feedback', require('./routes/feedbackRoutes')); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

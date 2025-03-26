const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Configure Middlewares
app.use(express.json());
app.use(express.urlencoded({'extended':true}));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use('/uploads', express.static('uploads'));

// My Routes
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/diseases', require('./routes/diseaseRoutes'));
app.use('/api/medicines', require('./routes/medicineRoutes'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const dbConnect = require('./lib/dbConnect');
const Startup = require('./models/Startup');
const registerRoute = require('./routes/register');
const cors = require('cors');

const app = express();

// Middleware to enable CORS
app.use(cors({
  origin: ['http://localhost:3000', 'https://foundercult.onrender.com'], // Allow requests from both origins
  methods: ['GET', 'POST', 'OPTIONS'], // Allow these HTTP methods
  allowedHeaders: ['Content-Type'], // Allow these headers
}));

// Middleware to parse JSON bodies
app.use(express.json({ limit: '50mb' }));

// API Routes
app.use('/api', registerRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 3001;
dbConnect().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to connect to MongoDB:', err);
});
const express = require('express');
const router = express.Router();
const dbConnect = require('../lib/dbConnect');
const Startup = require('../models/Startup');

router.post('/register', async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  await dbConnect();

  try {
    const formData = req.body;

    // Create a new startup document
    const startup = new Startup(formData);
    await startup.save();

    res.status(201).json({ message: 'Registration submitted successfully', startupId: startup._id });
  } catch (error) {
    console.error(error);
    if (error.name === 'ValidationError') {
      const errors = {};
      for (let field in error.errors) {
        errors[field] = error.errors[field].message;
      }
      return res.status(400).json({ message: 'Validation failed', errors });
    }
    res.status(400).json({ message: 'Error submitting registration', error: error.message });
  }
});

module.exports = router;
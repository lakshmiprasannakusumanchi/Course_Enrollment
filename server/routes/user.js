const express = require('express');
const router = express.Router();
const User = require('../models/users');
const jwt = require('jsonwebtoken');

// @route   POST /api/user/register
// @desc    Create a user
// @access  Public
router.post('/register', async (req, res) => {
  const { email, fullName, password, role } = req.body;

  try {
    // Check if the user with the given email already exists
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
      return res.status(400).json({ error: "User already registered!" });
    } else {
      // Create a new user
      const newUser = await User.create({
        username: fullName,
        email,
        password,
        role,
      });
      return res.status(201).json(newUser); // Use 201 status for successful creation
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }
});


// @desc    Login user
// @route   POST /api/users/login
// @access  Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const foundUser = await User.findOne({ email });

    if (foundUser) {
      // Check if the provided password matches the stored password
      if (foundUser.password === password) {
        // Generate a JWT token with user's ID and role
        const token = jwt.sign({ userId: foundUser._id, role: foundUser.role }, 'your-secret-key', { expiresIn: '1h' });
        return res.json({ token, userId: foundUser._id, role: foundUser.role });
      }
      else {
        return res.status(401).json({ error: "Password is incorrect" });
      }
    }
    else {
      return res.status(404).json({ error: "No record found" });
    }
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }

});

module.exports = router;

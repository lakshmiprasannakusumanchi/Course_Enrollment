// Import necessary modules
const express = require('express');
const router = express.Router();
const User = require('../models/users');
const jwt = require('jsonwebtoken');

// @route   POST /api/admin/login
// @desc    Login admin
// @access  Public
router.post('/admin/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const foundAdmin = await User.findOne({ email, role: 'admin' });
        if (foundAdmin) {
            if (foundAdmin.password === password) {
                const token = jwt.sign({ userId: foundAdmin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                res.json({ token, userId: foundAdmin._id });
            } else {
                res.status(401).json({ error: "Password is incorrect" });
            }
        } else {
            res.status(404).json({ error: "No record found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { protect } = require('../middleware/authMiddleware');
const User = require('../models/userModel');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
router.get('/profile', protect, asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');

    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
}));

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
router.put('/profile', protect, asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            token: generateToken(updatedUser._id),
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
}));

// @desc    Update user preferences
// @route   PUT /api/users/preferences
// @access  Private
router.put('/preferences', protect, asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.preferences = {
            ...user.preferences,
            ...req.body
        };

        const updatedUser = await user.save();

        res.json({
            preferences: updatedUser.preferences
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
}));

// @desc    Get user favorites
// @route   GET /api/users/favorites
// @access  Private
router.get('/favorites', protect, asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).populate('favorites');

    if (user) {
        res.json(user.favorites);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
}));

module.exports = router; 
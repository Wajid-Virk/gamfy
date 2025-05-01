const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { protect } = require('../middleware/authMiddleware');
const Game = require('../models/gameModel');
const User = require('../models/userModel');

// @desc    Get all games with pagination
// @route   GET /api/games
// @access  Public
router.get('/', asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const games = await Game.find()
        .sort({ popularity: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit);

    const total = await Game.countDocuments();

    res.json({
        games,
        page,
        pages: Math.ceil(total / limit),
        total
    });
}));

// @desc    Search games
// @route   GET /api/games/search
// @access  Public
router.get('/search', asyncHandler(async (req, res) => {
    const { query, genre, rating, sort } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let searchQuery = {};

    if (query) {
        searchQuery.$text = { $search: query };
    }

    if (genre) {
        searchQuery.genres = genre;
    }

    if (rating) {
        searchQuery.rating = { $gte: parseFloat(rating) };
    }

    let sortQuery = {};
    if (sort === 'rating') {
        sortQuery.rating = -1;
    } else if (sort === 'popularity') {
        sortQuery.popularity = -1;
    } else {
        sortQuery.createdAt = -1;
    }

    const games = await Game.find(searchQuery)
        .sort(sortQuery)
        .skip(skip)
        .limit(limit);

    const total = await Game.countDocuments(searchQuery);

    res.json({
        games,
        page,
        pages: Math.ceil(total / limit),
        total
    });
}));

// @desc    Get single game
// @route   GET /api/games/:id
// @access  Public
router.get('/:id', asyncHandler(async (req, res) => {
    const game = await Game.findById(req.params.id);

    if (game) {
        res.json(game);
    } else {
        res.status(404);
        throw new Error('Game not found');
    }
}));

// @desc    Add game to favorites
// @route   POST /api/games/:id/favorite
// @access  Private
router.post('/:id/favorite', protect, asyncHandler(async (req, res) => {
    const game = await Game.findById(req.params.id);
    const user = await User.findById(req.user._id);

    if (!game) {
        res.status(404);
        throw new Error('Game not found');
    }

    if (user.favorites.includes(game._id)) {
        res.status(400);
        throw new Error('Game already in favorites');
    }

    user.favorites.push(game._id);
    await user.save();

    res.json({ message: 'Game added to favorites' });
}));

// @desc    Remove game from favorites
// @route   DELETE /api/games/:id/favorite
// @access  Private
router.delete('/:id/favorite', protect, asyncHandler(async (req, res) => {
    const game = await Game.findById(req.params.id);
    const user = await User.findById(req.user._id);

    if (!game) {
        res.status(404);
        throw new Error('Game not found');
    }

    user.favorites = user.favorites.filter(
        (favorite) => favorite.toString() !== game._id.toString()
    );
    await user.save();

    res.json({ message: 'Game removed from favorites' });
}));

module.exports = router; 
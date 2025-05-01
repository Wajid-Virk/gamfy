const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    genres: [{
        type: String,
        required: true
    }],
    platforms: [{
        type: String,
        required: true
    }],
    developer: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    coverImage: {
        type: String,
        required: true
    },
    screenshots: [{
        type: String
    }],
    popularity: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Index for search functionality
gameSchema.index({ title: 'text', description: 'text' });

const Game = mongoose.model('Game', gameSchema);

module.exports = Game; 
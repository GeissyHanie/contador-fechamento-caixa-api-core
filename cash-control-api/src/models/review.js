const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    cashCountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CashCount',
        required: true
    },
    reviewerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comments: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
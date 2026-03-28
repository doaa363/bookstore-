const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: [true, 'Review content cannot be empty!']
    },
    rating: {
        type: Number,
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating cannot be more than 5'],
        required: [true, 'Please provide a rating between 1 and 5']
    },
    // Reference to the book being reviewed
    book: {
        type: mongoose.Schema.ObjectId,
        ref: 'Book',
        required: [true, 'A review must belong to a book']
    },
    // Reference to the user who wrote the review
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'A review must belong to a user']
    }
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
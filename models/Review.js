const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: [true, 'لازم تكتب رأيك في الكتاب!']
    },
    rating: {
        type: Number,
        min: [1, 'أقل تقييم هو 1'],
        max: [5, 'أعلى تقييم هو 5'],
        required: [true, 'لازم تدي تقييم للكتاب من 1 لـ 5']
    },
    // هنا بنربط التقييم بالكتاب
    book: {
        type: mongoose.Schema.ObjectId,
        ref: 'Book',
        required: [true, 'التقييم لازم يكون تابع لكتاب معين']
    },
    // وهنا بنربط التقييم بالمستخدم اللي كتبه
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'التقييم لازم يكون من مستخدم مسجل']
    }
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
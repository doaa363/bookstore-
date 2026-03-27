const Review = require('../models/Review');
const catchAsync = require('../utils/catchAsync');

// 1. إضافة تقييم جديد
exports.createReview = catchAsync(async (req, res, next) => {
    // بناخد البيانات اللي اليوزر بعتها في الـ Body (التقييم، الرقم، الـ ID بتاع الكتاب، والـ ID بتاع اليوزر)
    const newReview = await Review.create(req.body);

    res.status(201).json({
        status: 'success',
        data: { review: newReview }
    });
});

// 2. عرض كل التقييمات
exports.getAllReviews = catchAsync(async (req, res, next) => {
    // find() بتجيب كل التقييمات اللي في الداتابيز
    const reviews = await Review.find();

    res.status(200).json({
        status: 'success',
        results: reviews.length,
        data: { reviews }
    });
});
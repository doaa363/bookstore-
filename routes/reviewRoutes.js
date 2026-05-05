const express = require('express');
const reviewController = require('../controllers/reviewController');
const authMiddleware = require('../middleware/authMiddleware');
// السطر ده هو اللي كان بيعمل Error.. صلحنا المسار هنا
const { validateReview } = require('../controllers/valdition/reviewValidator');

const router = express.Router();

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authMiddleware.protect, 
    authMiddleware.restrictTo('user', 'admin'), 
    validateReview, // الميدلوير بتاع Joi
    reviewController.createReview
  );

module.exports = router;
const express = require('express');
const bookController = require('../controllers/bookController');
const authMiddleware = require('../middleware/authMiddleware'); // تأكد من اسم الفولدر والملف

const router = express.Router();

// Public: Anyone can see books
router
  .route('/')
  .get(bookController.getAllBooks);

// Protected: Only Admin can Create, Update, or Delete
router
  .route('/')
  .post(
    authMiddleware.protect, 
    authMiddleware.restrictTo('admin'), 
    bookController.createBook
  );

router
  .route('/:id')
  .get(bookController.getBook)
  .patch(
    authMiddleware.protect, 
    authMiddleware.restrictTo('admin'), 
    bookController.updateBook
  )
  .delete(
    authMiddleware.protect, 
    authMiddleware.restrictTo('admin'), 
    bookController.deleteBook
  );

module.exports = router;
const express = require('express');
const router = express.Router();
const{
    createBook,
    getAllBooks
    ,getBook
    ,updateBook
    ,deleteBook
} = require('../controllers/bookController');
const {protect,restrictTo} =require('../middleware/authMiddleware');
router.route('/')
.get(getAllBooks)
.post(protect,restrictTo('admin'),createBook);
router.route('/:id')
.get(getBook)
.patch(protect,restrictTo('admin'),updateBook)
.delete(protect,restrictTo('admin'),deleteBook);
module.exports = router;
const Book = require('../models/Book');

// إضافة كتاب جديد
exports.createBook = async (req, res) => {
    try {
        const newBook = await Book.create(req.body);
        res.status(201).json({
            status: 'success',
            data: newBook
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// عرض كل الكتب
exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json({
            status: 'success',
            results: books.length,
            data: books
        });
    } catch (err) {
        res.status(404).json({ status: 'fail', message: err.message });
    }
};
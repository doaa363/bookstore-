const Book = require('../models/Book');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

// 1) GET ALL BOOKS
exports.getAllBooks = catchAsync(async (req, res, next) => {
  const queryObj = { ...req.query };
  const excludedFields = ['page', 'sort', 'limit', 'fields'];
  excludedFields.forEach(el => delete queryObj[el]);

  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

  const query = Book.find(JSON.parse(queryStr));
  const books = await query;

  res.status(200).json({
    status: 'success',
    results: books.length,
    data: { books }
  });
});

// 2) GET SINGLE BOOK
exports.getBook = catchAsync(async (req, res, next) => {
  const book = await Book.findById(req.params.id);
  if (!book) return next(new AppError('No book found with that ID', 404));

  res.status(200).json({
    status: 'success',
    data: { book }
  });
});

// 3) CREATE BOOK
exports.createBook = catchAsync(async (req, res, next) => {
  const newBook = await Book.create(req.body);
  res.status(201).json({
    status: 'success',
    data: { book: newBook }
  });
});

// 4) UPDATE BOOK
exports.updateBook = catchAsync(async (req, res, next) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!book) return next(new AppError('No book found with that ID', 404));

  res.status(200).json({
    status: 'success',
    data: { book }
  });
});

// 5) DELETE BOOK
exports.deleteBook = catchAsync(async (req, res, next) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  if (!book) return next(new AppError('No book found with that ID', 404));

  res.status(204).json({
    status: 'success',
    data: null
  });
});
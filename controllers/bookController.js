const Book = require('../models/Book'); // تأكد أن الحرف B كبير كما في ملفاتك
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

// 1. إضافة كتاب جديد (Create)
exports.createBook = catchAsync(async (req, res, next) => {
    const newBook = await Book.create(req.body);
    
    res.status(201).json({
        status: 'success',
        data: { 
            book: newBook 
        }
    });
});

// 2. عرض كل الكتب (Read All)
exports.getAllBooks = catchAsync(async (req, res, next) => {
    const books = await Book.find();
    
    res.status(200).json({
        status: 'success',
        results: books.length,
        data: { 
            books 
        }
    });
});

// 3. عرض كتاب واحد بالـ ID (Read Single)
exports.getBook = catchAsync(async (req, res, next) => {
    const book = await Book.findById(req.params.id);
    
    if (!book) {
        return next(new AppError('الكتاب ده مش موجود يا هندسة! 🧐', 404));
    }
    
    res.status(200).json({ 
        status: 'success', 
        data: { book } 
    });
});

// 4. تعديل كتاب (Update)
exports.updateBook = catchAsync(async (req, res, next) => {
    // استخدمنا returnDocument: 'after' بدل new: true عشان الـ Warning يختفي
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
        returnDocument: 'after', 
        runValidators: true
    });

    if (!book) {
        return next(new AppError('مش عارف أعدل كتاب مش موجود أصلاً! 😅', 404));
    }

    res.status(200).json({ 
        status: 'success', 
        data: { book } 
    });
});

// 5. حذف كتاب (Delete)
exports.deleteBook = catchAsync(async (req, res, next) => {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
        return next(new AppError('بتحاول تمسح سراب؟ الكتاب مش موجود! 👻', 404));
    }

    // الـ 204 مش بترجع Body، بس بنبعت success للتأكيد داخلياً
    res.status(204).json({ 
        status: 'success', 
        data: null 
    });
});
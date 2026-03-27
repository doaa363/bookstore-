const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Routers
const authRouter = require('./routes/authRoutes');
const bookRouter = require('./routes/bookRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const userRouter = require('./routes/userRoutes'); // 👈 صلحنا الاستدعاء هنا (حطينا const والنقطة)

// Utils
const AppError = require('./utils/AppError');

dotenv.config();
const app = express();

// Middlewares الأساسية
app.use(express.json()); // عشان السيرفر يفهم JSON

// ربط الـ Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/books', bookRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/users', userRouter); // 👈 ضفنا السطر ده عشان السيرفر يربط المسار بالراوتر

// مسار صيد الروابط الغلط (404)
app.use((req, res, next) => {
    next(new AppError(`the server not found ${req.originalUrl}`, 404));
});

// Global Error Handling
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        stack: err.stack
    });
});

// الاتصال بالداتابيز
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to MongoDB Successfully'))
.catch((err) => console.log('DB Connection Error:', err));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
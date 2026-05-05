const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// 1) Route Imports
// Updated Paths: Now looking directly in the 'routes' folder
const authRouter = require('./routes/authRoutes');
const bookRouter = require('./routes/bookRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const userRouter = require('./routes/userRoutes');

// 2) Utils
const AppError = require('./utils/AppError');

dotenv.config();
const app = express();

// 3) Global Middlewares
app.use(express.json()); // Essential for parsing JSON request bodies

// 4) Route Mounting
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/books', bookRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/users', userRouter);

// 5) Handling Unhandled Routes (404)
app.all(/(.*)/, (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// 6) Global Error Handling Middleware
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        stack: err.stack
    });
});

// 7) Database Connection
// Falls back to local MongoDB if MONGO_URI is not provided in .env
const DB = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/libraryDB";

mongoose.connect(DB)
    .then(() => {
        console.log('Connected to MongoDB Successfully');
        console.log('--- Database is active and ready ---');
    })
    .catch((err) => {
        console.log('❌ DB Connection Error:', err.message);
    });

// 8) Server Initialization
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}...`);
});
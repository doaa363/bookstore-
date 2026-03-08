const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// 1. استدعاء الـ Routers (مرة واحدة لكل ملف)
const authRouter = require('./routes/authRoutes');
const bookRouter = require('./routes/bookRoutes');

dotenv.config();
const app = express();

// 2. Middlewares الأساسية
app.use(express.json()); // عشان السيرفر يفهم الـ JSON اللي بعته في الـ Body

// 3. ربط المسارات (Routes)
app.use('/api/v1/auth', authRouter);  // كل ما يخص التسجيل والدخول
app.use('/api/v1/books', bookRouter); // كل ما يخص الكتب والصلاحيات

// 4. الاتصال بالداتابيز
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB Successfully'))
  .catch((err) => console.log(' DB Connection Error:', err));

// 5. تشغيل السيرفر
const port = process.env.PORT || 3000;
app.listen(port, () => {console.log(`Server running on port ${port}`)
});
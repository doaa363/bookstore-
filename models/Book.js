const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'لازم تكتب عنوان الكتاب'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'لازم تكتب وصف للكتاب']
    },
    author: {
        type: String,
        required: [true, 'لازم تكتب اسم المؤلف']
    },
    price: {
        type: Number,
        required: [true, 'لازم تحدد سعر الكتاب']
    },
    stock: {
        type: Number,
        default: 1
    },
    category: {
        type: String,
        required: [true, 'لازم تحدد تصنيف الكتاب (مثل: رواية، برمجة)']
    }
}, { timestamps: true }); // بيضيف وقت الإنشاء والتعديل تلقائياً

module.exports = mongoose.model('Book', bookSchema);
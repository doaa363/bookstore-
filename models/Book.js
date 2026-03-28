const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'You must write the book title'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'you must write a description for the book ']
    },
    author: {
        type: String,
        required: [true, 'you have to write the auther name']
    },
    price: {
        type: Number,
        required: [true, 'you have to detirmane the price of the book']
    },
    stock: {
        type: Number,
        default: 1
    },
    category: {
        type: String,
        required: [true, 'You must specify the book']
    }
}, { timestamps: true }); // بيضيف وقت الإنشاء والتعديل تلقائياً

module.exports = mongoose.model('Book', bookSchema);
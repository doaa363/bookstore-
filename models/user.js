const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        trim: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        lowercase: true 
    },
    password: { 
        type: String, 
        required: true, 
        minlength: 6 
    },
    role: {
        type: String,
        enum: ['customer', 'admin'],
        default: 'customer'
    }
}, { timestamps: true });

// 1. تشفير الباسورد قبل الحفظ في الداتابيز
userSchema.pre('save', async function () {
    // لو الباسورد متغيرش (أو ده مش يوزر جديد)، متعملش حاجة
    if (!this.isModified('password')) return;

    // تشفير الباسورد
    this.password = await bcrypt.hash(this.password, 12);
});

// 2. دالة لمقارنة الباسورد العادي بالمتشفر (هنحتاجها في الـ Login)
userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

// 3. تصدير الموديل عشان نقدر نستخدمه في باقي المشروع
module.exports = mongoose.model('User', userSchema);
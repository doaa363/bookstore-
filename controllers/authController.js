const { models } = require("mongoose");
const User = require("../models/user");
const jwt = require('jsonwebtoken');

// 1. وظيفة لعمل التوكن
const signToken = (id) => {
    return jwt.sign({ id: id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '1d'
    });
};
exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ status: 'fail', message: 'الإيميل ده متسجل قبل كده!' });
        }

        const newUser = await User.create({ name, email, password, role });

        const token = signToken(newUser._id);
        res.status(201).json({ 
            status: 'success', 
            token, 
            data: { user: newUser } 
        });

    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

// 3. تسجيل الدخول (Login)
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ status: 'fail', message: 'يا ريت تكتب الإيميل والباسورد' });
        }

        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await user.correctPassword(password, user.password))) {
            return res.status(401).json({ status: 'fail', message: 'الإيميل أو الباسورد غلط' });
        }

        const token = signToken(user._id);
        res.status(200).json({ status: 'success', token });

    } catch (err) {
        res.status(500).json({ status: 'error', message: 'حصلت مشكلة في السيرفر' });
    }
};
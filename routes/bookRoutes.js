const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const authMiddleware = require('../middleware/authMiddleware');

// --- 1. المسارات العامة (للكل) ---
router.get('/', bookController.getAllBooks);
router.get('/:id', (req, res) => { /* لو حابب تعرض كتاب واحد */ });

// --- 2. حماية المسارات (لازم Token) ---
router.use(authMiddleware.protect);

// --- 3. مسارات الأدمن فقط (إضافة، تعديل، حذف) ---
router.use(authMiddleware.restrictTo('admin'));

router.post('/add', bookController.createBook);

// تعديل كتاب (محتاج ID الكتاب)
router.patch('/:id', (req, res) => {
    res.json({ msg: "تم تعديل الكتاب بنجاح" });
});

// حذف كتاب
router.delete('/:id', (req, res) => {
    res.json({ msg: "تم حذف الكتاب بنجاح" });
});

module.exports = router;
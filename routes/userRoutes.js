const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

// لو عندك دوال تانية زي نسيت الباسورد ضيفها هنا
// router.post('/forgotPassword', authController.forgotPassword);

module.exports = router;
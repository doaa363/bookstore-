const express = require('express');
// التصحيح هنا: الـ R لازم تكون Capital
const router = express.Router(); 

const authController = require('../controllers/authController');

// المسارات (Endpoints)
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
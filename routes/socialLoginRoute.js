const express = require('express');
const router = express.Router();
const { socialLogin } = require('../controllers/socialLoginController');

// Social Login Route
router.post('/socialLogin', socialLogin);

module.exports = router;

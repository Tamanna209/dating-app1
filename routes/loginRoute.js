const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/loginController');

// Login Route
router.post('/login', loginUser);

module.exports = router;

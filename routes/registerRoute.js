const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/registerController');

// Register Route
router.post('/register', registerUser);

module.exports = router;

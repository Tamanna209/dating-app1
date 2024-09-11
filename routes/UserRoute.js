const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');


//get 
router.get('/', userController.getUsers);
// Register a new user
router.post('/register', userController.registerUser);

// Login an existing user
router.post('/login', userController.loginUser);

module.exports = router;

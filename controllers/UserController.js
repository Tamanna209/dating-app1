const User = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// JWT Secret
const JWT_SECRET = 'datingApp1ByNCPL';

// Register a new user
exports.registerUser = async (req, res) => {
    const { username, email, pno, password } = req.body;

    try {
        // Check if user exists
        let user = await User.findOne({ $or: [{ username }, { email }] });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user
        user = new User({ username, email, pno, password });
        await user.save();

        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

// Login user
exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Generate JWT token
        const tokenData = {
            auth_token: jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' }),
            userId: user._id,
            login_time: new Date().toISOString().replace('T', ' ').substring(0, 19)
        };

        // Return success response with user details
        res.status(200).json({
            status: "1",
            message: "User has been logged successfully",
            details: {
                id: user._id,
                register: user.register,
                active: user.active,
                block: user.block,
                profile_created: user.profile_created,
                app_id: user.app_id,
                token_data: tokenData
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

// const User = require('../models/Users');
// const bcrypt = require('bcrypt');
// const { v4: uuidv4 } = require('uuid');

// // Register a new user
// exports.registerUser = async (req, res) => {
//     const { username, email, pno, password, fcm_token, device_id, country } = req.body;

//     try {
//         // Check if user exists by username or email
//         let user = await User.findOne({ $or: [{ username }, { email }] });
//         if (user) {
//             return res.status(400).json({ message: 'User already exists', user: { register: 0 } });
//         }

//         // Hash the password before saving
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Generate a unique app_id for the user
//         const app_id = `@${uuidv4()}`;

//         // Create the new user object with the values provided
//         user = new User({
//             username,
//             email,
//             pno,
//             password: hashedPassword,
//             fcm_token,
//             device_id,
//             country,
//             active:1,
//             block:0,
//             profile_created: 1, // Set profile_created to 1 for successful registration
//             app_id
//         });

//         // Save the user to the database
//         await user.save();

//         // Send success response with register = 1
//         res.status(201).json({
//             message: 'User registered successfully',
//             user: {
//                 ...user.toObject(), // Convert Mongoose document to plain object
//                 register: 1 // Registration success
//             }
//         });
//     } catch (error) {
//         console.error(error);
//         // Send failure response with register = 0
//         res.status(500).json({
//             message: 'Server error',
//             user: { register: 0 }
//         });
//     }
// };




//UPDATED
// controllers/registerController.js
const User = require('../models/Users');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid'); // Import uuid

// Register a new user
exports.registerUser = async (req, res) => {
    const { username, email, pno, password, fcm_token, device_id, country, name, socialId } = req.body;

    try {
        // Check if user exists
        let user = await User.findOne({ $or: [{ username }, { email }] });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password only if it is provided
        let hashedPassword;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        } else {
            return res.status(400).json({ message: 'Password is required for registration' });
        }

        // Generate a unique app_id for the user
        const app_id = `@${uuidv4()}`;

        // Create a new user
        user = new User({
            username,
            email,
            pno,
            password: hashedPassword, // Store hashed password
            fcm_token,
            device_id,
            country,
            app_id,      // Include app_id
            name,        // Optional for social login
            socialId,    // Optional for social login
            register: 1, // Set register to 1
            active: 1,   // Set active to 1
            block: 0,    // Set block to 0
            profile_created: 1 // Set profile_created to 1
        });
        await user.save();

        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

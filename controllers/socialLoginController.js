const User = require('../models/Users');
const { v4: uuidv4 } = require('uuid');

// Social Login
exports.socialLogin = async (req, res) => {
    const { name, socialId, email, fcm_token, device_id, country } = req.body;

    try {
        // Check if the user exists by email or socialId
        let user = await User.findOne({ $or: [{ email }, { socialId }] });

        if (user) {
            // User exists, perform login
            user.fcm_token = fcm_token; // Update FCM token
            user.device_id = device_id; // Update device ID
            await user.save();

            return res.status(200).json({
                status: 1,
                message: "User logged in successfully",
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    socialId: user.socialId,
                    fcm_token: user.fcm_token,
                    device_id: user.device_id,
                    country: user.country,
                    app_id: user.app_id
                }
            });
        }

        // If the user doesn't exist, create a new user
        const newUser = new User({
            name,
            socialId,
            email,
            fcm_token,
            device_id,
            country,
            register: "1", // Mark user as registered
            profile_created: "1" // Profile created
        });

        await newUser.save();

        res.status(201).json({
            status: 1,
            message: "User registered successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                socialId: newUser.socialId,
                reg_id: newUser.reg_id,
                device_id: newUser.device_id,
                country: newUser.country,
                app_id: newUser.app_id
            }
        });
    } catch (error) {
        console.error("Social login error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');



// // models/Users.js
// //new



// const UserSchema = new mongoose.Schema({
//     username: { type: String, required: true, unique: true },
//     email: { type: String, required: true, unique: true },
//     pno: { type: String, required: true, validate: { validator: (v) => /^\d{10}$/.test(v), message: 'Phone number must be exactly 10 digits' }},
//     password: { type: String },  // Optional for social login
//     fcm_token: { type: String },
//     device_id: { type: String },
//     country: { type: String },
//     app_id: { type: String, unique: true }, // Unique app_id for each user
//     register: { type: Number, default: 0 },
//     active: { type: Number, default: 1 },
//     block: { type: Number, default: 0 },
//     profile_created: { type: Number, default: 0 },
//     name: { type: String },      // Optional for social login
//     socialId: { type: String }   // Optional for social login
// });

// module.exports = mongoose.model('User', UserSchema);



//UPdated 
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

// Define the User schema
const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true, sparse: true }, // Username field added
    name: { type: String },
    email: { type: String, unique: true, sparse: true },
    pno: { type: String },
    password: { type: String }, // Optional for social login
    socialId: { type: String, unique: true, sparse: true }, // Unique for social login
    register: { type: String, default: "0" }, // Set to "1" upon successful registration
    active: { type: String, default: "1" },
    block: { type: String, default: "0" },
    profile_created: { type: String, default: "0" }, // "1" after successful registration
    app_id: { type: String, unique: true }, // Unique app ID
    fcm_token: { type: String }, // FCM token
    device_id: { type: String }, // Device ID
    country: { type: String },
}, { timestamps: true });

// Middleware to generate unique app_id before saving
UserSchema.pre('save', function(next) {
    if (!this.app_id) {
        this.app_id = `@${uuidv4()}`; // Generate unique app_id if not present
    }
    next();
});

module.exports = mongoose.model('User', UserSchema);


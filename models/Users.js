const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the User schema
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    pno: { type: String, required: true },
    password: { type: String, required: true },
    register: { type: String, default: "1" },
    active: { type: String, default: "1" },
    block: { type: String, default: "0" },
    profile_created: { type: String, default: "0" },
    app_id: { type: String, unique: true }
});

// Hash password before saving to the database
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;

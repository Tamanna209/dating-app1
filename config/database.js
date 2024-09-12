const mongoose = require('mongoose');

// Function to connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://metamannaw3:Tampass123@cluster0.7jtv0.mongodb.net/datingApp?retryWrites=true&w=majority&appName=Cluster0');
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;

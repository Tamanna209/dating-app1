// // 

// const express = require('express');
// const bodyParser = require('body-parser');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');

// // Secret key for JWT (You can put this in an environment variable)
// const JWT_SECRET = 'dating1novem';

// const app = express();
// const port = 3000;

// // Middleware to parse JSON data
// app.use(bodyParser.json());

// // Hardcoded user data for testing purposes (in a real app, you'd query a database)
// const users = [];

// async function initUsers() {
//     const hashedPassword = await bcrypt.hash("password123", 10);
//     users.push({
//         id: "1",
//         username: "testuser",
//         password: hashedPassword,
//         register: "1",
//         active: "1",
//         block: "0",
//         profile_created: "0",
//         app_id: "@9000001"
//     });
// }

// initUsers();

// // Login route
// app.post('/login', async (req, res) => {
//     const { username, password } = req.body;

//     // Find user by username
//     const user = users.find(user => user.username === username);

//     if (!user) {
//         return res.status(401).json({
//             status: "0",
//             message: "Invalid username"
//         });
//     }

//     // Compare provided password with stored hashed password
//     const isPasswordValid = await bcrypt.compare(password, user.password);

//     if (!isPasswordValid) {
//         return res.status(401).json({
//             status: "0",
//             message: "Invalid password"
//         });
//     }

//     // Generate JWT token
//     const tokenData = {
//         auth_token: jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' }),
//         userId: user.id,
//         login_time: new Date().toISOString().replace('T', ' ').substring(0, 19)  // Format to "YYYY-MM-DD HH:mm:SS"
//     };

//     // Return success response with user details
//     return res.status(200).json({
//         status: "1",
//         message: "User has been logged successfully",
//         details: {
//             id: user.id,
//             register: user.register,
//             active: user.active,
//             block: user.block,
//             profile_created: user.profile_created,
//             app_id: user.app_id,
//             token_data: tokenData
//         }
//     });
// });

// // Starting the server
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });




//NEW



const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/database');
const userRoutes = require('./routes/UserRoute');

const app = express();
const port = 3000;

// Connect to MongoDB
connectDB();

// Middleware to parse JSON data
app.use(bodyParser.json());

// Use user routes
app.use('/api/users', userRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

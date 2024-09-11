const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;


app.use(bodyParser.json());

// Registration route
app.post('/register', (req, res) => {
    const { username, email, pno, password, lat, long, fcmToken, deviceId } = req.body;

    // Simple validation 
    if (!username || !email || !password || !pno) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const newUser = {
        username,
        email,
        pno,
        password,  
        lat,
        long,
        fcmToken,
        deviceId
    };

    
    res.status(201).json({
        message: 'User registered successfully!',
        // user: newUser
    });
});

// Starting the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

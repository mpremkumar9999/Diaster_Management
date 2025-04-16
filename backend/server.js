// backend/server.js
const express = require('express');
const connectDB = require('./config/database');
const cors = require('cors');
const http = require('http');
const socketio = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketio(server, { cors: { origin: '*' } });

connectDB();

// Initialize middleware
app.use(express.json({ extended: false }));
app.use(cors());

// Define Routes
app.use('/users', require('./routes/users'));
app.use('/requests', require('./routes/requests'));
app.use('/alerts', require('./routes/alerts'));

// Socket.IO connection (for potential future use)
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    //  Add more socket event handlers here if needed, e.g., for district rooms
});

// Middleware to make io instance available in route handlers (optional)
app.use((req, res, next) => {
    req.io = io;
    next();
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));

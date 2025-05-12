const express = require('express');
const connectDB = require('./config/database');
const cors = require('cors');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketio(server, { 
  cors: { 
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  } 
});

// Connect to MongoDB
connectDB();

// Middleware
const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173']; // Add your frontend URLs here
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Make io available in routes
app.use((req, res, next) => {
  req.io = io;
  next();
});
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


// Import only the router part from alerts
const { router: alertsRouter } = require('./routes/alerts');

// API Routes
const requestRoutes = require('./routes/requests');
app.use('/api/requests', requestRoutes);
app.use('/api/users', require('./routes/users'));
app.use('/api/requests', require('./routes/requests'));
app.use('/api/alerts', alertsRouter); // ✅ use alertsRouter instead of full object
app.use('/api/donations', require('./routes/donations'));
app.use('/api/volunteer', require('./routes/volunteerTasks'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Socket.IO for real-time updates
io.on('connection', (socket) => {
  console.log('New client connected');
  
  // Join room for district-specific updates
  socket.on('join-district', (district) => {
    socket.join(district);
    console.log(`User joined district: ${district}`);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection:', err);
  process.exit(1);
});

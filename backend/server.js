require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

// Import routes
const userRoutes = require('./routes/userRoutes');
const gigRoutes = require('./routes/gigRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const chatRoutes = require('./routes/chatRoutes');

// Import socket.io handler
const socketHandler = require('./utils/socketHandler');

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://gigy-last-1.onrender.com",
  "http://gigy.in",
  "https://gigy.in",
  "http://www.gigy.in", 
  "https://www.gigy.in"
];

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        console.log(`Socket.io - Origin ${origin} not allowed by CORS`);
        // For production, we'll still allow connections for now
        callback(null, true);
      }
    },
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    // In production, we should check origin more carefully
    if (!origin) return callback(null, true);
    
    console.log(`Request from origin: ${origin}`);
    
    // For production, allow any origin for now to debug the specific issue
    callback(null, true);
    
    // Once you identify all necessary origins, switch to this code:
    /*
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log(`Express - Origin ${origin} rejected by CORS`);
      callback(new Error('Not allowed by CORS'));
    }
    */
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  exposedHeaders: ["Content-Range", "X-Content-Range"]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/gigs', gigRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/chats', chatRoutes);

// Socket.io
socketHandler(io);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

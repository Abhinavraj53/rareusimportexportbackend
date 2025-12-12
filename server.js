const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB successfully');
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});

// Routes
app.use('/register', require('./routes/auth'));
app.use('/login', require('./routes/auth'));
app.use('/users', require('./routes/users'));
app.use('/electronics', require('./routes/electronics'));

// Health check
app.get('/', (req, res) => {
  res.json({ 
    message: 'Alibaba Backend API is running',
    status: 'OK',
    endpoints: {
      register: 'POST /register',
      login: 'POST /login',
      users: 'GET /users/:token',
      electronics: 'GET /electronics/:category'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 MongoDB: Connected`);
});


// server.js
const express = require('express');
const mongoose = require('mongoose');
const quizRoutes = require('./routes/quizRoutes');

const app = express();

// Middleware to parse JSON
app.use(express.json());

// MongoDB connection
const MONGO_URI = 'mongodb://127.0.0.1:27017/quiz-app';

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/quizzes', quizRoutes);

// Root route
app.get('/', (req, res) => {
    res.send('Quiz API running');
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

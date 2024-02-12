const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const todoRoutes = require('./routes/todoRoutes');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/lab4', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/users', userRoutes);
app.use('/todos', todoRoutes);

// Error handling
process.on('uncaughtException', function(err) { 
    // Handle the error safely 
    console.log('Uncaught exception occurred:', err);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

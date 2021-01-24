// Require express
const express = require('express');
// Require connectDB
const connectDB = require('./config/connectDB');

// Require the user routes
const authRouter = require('./routes/auth');

// Initialize express
const app = express();

// MiddleWare
app.use(express.json());

// connect DB
connectDB();

// Use Routes
app.use('/api/auth', authRouter);

// Create port
const port = process.env.PORT || 5000;
// Launch the server
app.listen(port, (error) => {
  error
    ? console.log(error)
    : console.log(`the server is running on port ${port}`);
});

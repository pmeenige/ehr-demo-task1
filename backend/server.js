// server.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes'); // Import user routes
const taskRoutes = require('./routes/taskRoutes');


const app = express();

app.use(
  cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST','PUT','DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Middleware to handle JSON requests
app.use(express.json());
// Use user routes
app.use(userRoutes);
app.use(taskRoutes); // Ensure that your routes are being used

// Enable CORS


// Connect to the database
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Database connected successfully'))
  .catch((err) => {
    console.error('Error connecting to the database:', err);
    process.exit(1); // Exit the process if DB connection fails
  });




// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});

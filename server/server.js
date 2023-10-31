const { startRevisingSessionService } = require('./utils/reviseSessionService.js');

const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Use the specified port or default to 3000

// Middleware to parse JSON data
app.use(express.json());

// Define your routes here (e.g., for authentication)
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log('starting session service');
  startRevisingSessionService();
});

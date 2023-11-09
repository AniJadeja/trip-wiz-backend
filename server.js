require('dotenv').config(); // Load environment variables from .env file if available

const { startRevisingSessionService } = require('./server/session/reviseSessionService.js');

const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Use the specified port or default to 3000
// Middleware to parse JSON data
app.use(express.json());

// Define your routes here (e.g., for authentication)
const authRoutes = require('./server/routes/auth.js');
app.use('/authenticate', authRoutes);

// Define your routes here (e.g., for user data)32
const userRoutes = require('./server/routes/users.js');
app.use('/users', userRoutes);

const tripRoutes = require('./server/routes/trip.js');
app.use('/trip', tripRoutes);

const pingRoute = require('./server/routes/ping.js');
app.use('/ping', pingRoute);



// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log('starting session service');
  startRevisingSessionService();
});

const userModel = require('../models/userModel');
const manageUsers = require('../firebase/manageUsers.js'); // Import the manageUsers module


exports.authenticate = (req, res) => {
 
  const { username, password } = req.body;


  manageUsers.createUser(username, password)
    .then((user) => {
      // The createUser function returns a promise, so you can handle success and error here
      // Print the user model to the console.
      console.log(user);

      // Send a 200 OK response to Postman.
      res.status(200).json({ message: 'Authentication successful' });
    })
    .catch((error) => {
      // Handle any errors that occur during user creation
      res.status(400).json({ message: 'Authentication failed', error: error.message });
    });
};

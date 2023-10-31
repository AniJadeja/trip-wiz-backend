const userModel = require('../models/userModel');
const manageUsers = require('../firebase/manageUsers.js'); // Import the manageUsers module
const { getUserFromEmail, createUserInDatabase} = require("../firebase/manageRealtimeDatabase");


exports.newUser = (req, res) => {
 
  const { username, password } = req.body;


  manageUsers.createUser(username, password)
    .then((user) => { 
      // The createUser function returns a promise, so you can handle success and error here
      createUserInDatabase(user.uid, username, password);
      console.log(user);
      // Send a 200 OK response to Postman with uid and message
      res.status(200).json({ uid: user.uid, message: 'Authentication successful' });
    })
    .catch((error) => {
      // Handle any errors that occur during user creation
      res.status(400).json({ message: 'Authentication failed : error creating the user\n\t', error: error.message });
    });
};



exports.loginUser = (req, res) => {
 
  const { username } = req.body;
  getUserFromEmail(username).then((user) => {
    console.log("authController => loginUser uid : ",user.uid);
    manageUsers.loginUser(user.uid)
      .then((expiration) => { 
        
        console.log("authController => loginUser : ",expiration);
        res.status(200).json({ uid: user.uid, expiration : expiration, message: 'Authentication successful' });
      })
      .catch((error) => {
        // Handle any errors that occur during user creation
        if(error.message === "User does not have authorization."){
          res.status(401).json({ message: 'Authentication failed : error logging in user\n\tuseraccount has been disabled', error: error.message });
        }
        else{
          res.status(400).json({ message: 'Authentication failed : error logging in user\n\t', error: error.message });
        }
      });
  
  });
  
};

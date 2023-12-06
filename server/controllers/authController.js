const manageUsers = require('../firebase/manageUsers.js'); // Import the manageUsers module
const { getUserFromEmail, createUserInDatabase, updateUserInDatabase } = require("../firebase/manageRealtimeDatabase");
const { SignUpUser } = require("../models/userModel.js");



function formatDate(date) {
  const day = date.getDate().toString().padStart(2, '0'); // Get the day and pad with leading zero if necessary
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Get the month (Note: January is 0) and pad with leading zero if necessary
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}




exports.newUser = (req, res) => {

  const { username, password } = req.body;
  const today = new Date();
  const formattedDate = formatDate(today);


  let userData = new SignUpUser({
    displayName: req.body.displayName,
    dateOfBirth: req.body.dateOfBirth,
    dateOfCreation: formattedDate
  });

  console.log("authController => trying to create new user using manageUsers.createUser ")
  manageUsers.createUser(username, password)
    .then((user) => {
      console.log("authController => new user created using manageUsers.createUser");
      // The createUser function returns a promise, so you can handle success and error here
      createUserInDatabase(user.uid, username, password).then((uid) => {
        updateUserInDatabase(uid, userData).then(() => {
          console.log("authController => new user created using manageUsers.createUser");
          // Send a 200 OK response to Postman with uid and message
          res.status(200).json({ uid: user.uid, message: 'Authentication success : Successfully created the user' });
        }).catch((error) => {
          console.log("authController => error creating new user using manageUsers.createUser");
          // Handle any errors that occur during user creation
          res.status(400).json({ message: `Authentication failed : error creating the user > `, error: error.message });
        });
      }).catch((error) => {
        console.log("authController => error creating new user using manageUsers.createUser");
        // Handle any errors that occur during user creation
        res.status(400).json({ message: `Authentication failed : error creating the user > `, error: error.message });
      });


    })
    .catch((error) => {
      console.log("authController => error creating new user using manageUsers.createUser");
      // Handle any errors that occur during user creation
      res.status(400).json({ message: `Authentication failed : error creating the user > `, error: error.message });
    });
};

exports.verify = (req, res) => {
  res.status(200).json({ message: 'valid session : active session found', isLoggedin: true });
}
exports.loginUser = (req, res) => {

  const { username } = req.body;
  getUserFromEmail(username).then((user) => {
    console.log("authController => loginUser uid : ", user.uid);
    manageUsers.loginUser(user.uid)
      .then((expiration) => {

        console.log("authController => loginUser : ", expiration);
        res.status(200).json({ uid: user.uid, expiration: expiration, message: 'Authentication successful' });
      })
      .catch((error) => {
        // Handle any errors that occur during user creation
        if (error.message === "User does not have authorization.") {
          res.status(401).json({ message: 'Authentication failed : error logging in user > useraccount has been disabled', error: error.message });
        }
        else {
          res.status(400).json({ message: 'Authentication failed : error logging in user > ', error: error.message });
        }
      });

  });

};

exports.logout = (req, res) => {

  const { uid } = req.body;

  manageUsers.logoutUser(uid).then((code) => {
    if (code === 200) {
      res.status(200).json({ message: 'Logout success' });
    }
    else if (code === 401) {
      res.status(401).json({ message: 'Authentication failed : error logging out user > ', error: error.message });
    }
  }).catch((error) => {
    res.status(400).json({ message: 'Bad Request : Try Again , error ', error: error.message });
  });

}

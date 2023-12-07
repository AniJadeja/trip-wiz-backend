const { User } = require("../models/userModel.js");
const { isValidDate } = require("../utils/dateValiator.js");

const { getUserFromEmail,createUserInDatabase } = require("../firebase/manageRealtimeDatabase");
const { retrieveSession } = require("../session/sessionUtils");

exports.verifySignUpCreds = (req, res, next) => {
  const { username } = req.body;
  const { password } = req.body;

  let userData = new User({
    username: username,
    displayName: req.body.displayName,
   // dateOfBirth: req.body.dateOfBirth
  });

  // verify that username is meeting the email pattern cretieria
  // on top of that email should not contain any special characters other than .

  if (username !== undefined && username !== "") {
    if (password !== undefined && password !== "") {
      if (userData.displayName !== undefined && userData.displayName !== "") {
        next();
        // if (userData.dateOfBirth !== undefined && userData.dateOfBirth !== "" && isValidDate(userData.dateOfBirth, true)) {
        //   if (username.match(/^[a-zA-Z0-9.]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,4}$/)) {
        //     next();
        //   }
        //   else {
        //     res.status(401).json({ message: 'Invalid Username : error parsing the email > email cannot contain any special characters other than . (dot)' });
        //   }
        // }
        // else {
        //   res.status(401).json({ message: 'Invalid Date of Birth : error parsing the date of birth > date of birth is either empty or not valid (dd/mm/yyyy)' });
        // }
      } else {
        res.status(401).json({ message: 'Invalid Display Name : error parsing the display name > display name cannot be empty' });
      }
    }
    else {
      res.status(401).json({ message: 'Invalid Password : error parsing the password > password cannot be empty' });

    }
  } else {
    res.status(401).json({ message: 'Invalid Username : error parsing the email > email cannot be empty' });
  }
}




exports.verifyGoogleSignUpCreds = (req, res, next) => {
  const { username } = req.body;
  const { uid } = req.body;

  let userData = new User({
    uid : uid,
    username: username,
    displayName: req.body.displayName,
   // dateOfBirth: req.body.dateOfBirth
  });

  // verify that username is meeting the email pattern cretieria
  // on top of that email should not contain any special characters other than .

  if (username !== undefined && username !== "") {
    if (uid !== undefined && uid !== "") {
      if (userData.displayName !== undefined && userData.displayName !== "") {
        next();
      } else {
        res.status(401).json({ message: 'Invalid Display Name : error parsing the display name > display name cannot be empty' });
      }
    }
    else {
      res.status(401).json({ message: 'Invalid uid : error parsing the uid > uid cannot be empty' });

    }
  } else {
    res.status(401).json({ message: 'Invalid Username : error parsing the email > email cannot be empty' });
  }
}



exports.verifyUsernamePassword = (req, res, next) => {
  const { username, password } = req.body;

  getUserFromEmail(username).then((user) => {

    if (user != undefined) {
      console.log('authMiddleWare : user is not null');
      if (user.password === password) {
        console.log('authMiddleWare : password is correct');
        next();
      } else {
        console.log('database password is ' + user.password + ' and input password is ' + password);
        res.status(401).json({ message: `Incorrect Password : error verifying the user identity > incorrrect password for the username ${username}` });
      }
    }
    else {
      res.status(401).json({ message: 'Incorrect Username : error verifying the user identity > username is not found or the username contains errornous characters' });
    }


  })



}

exports.verifySession = (req, res, next) => {
  const { uid } = req.body;

  if (uid !== undefined && uid !== "") {
    console.log('authMiddleWare : uid is not null');

    retrieveSession(uid).then((sessionExists) => {
      if (sessionExists) {
        console.log('authMiddleWare : session is valid');
        next();
      } else {
        res.status(200).json({ message: 'Invalid Session : user is not logged in ', isLoggedin: false });
      }
    }).catch((error) => {
      res.status(401).json({ message: 'Unauthorized Session : invalid uid ', isLoggedin: false });
    });

  }
}
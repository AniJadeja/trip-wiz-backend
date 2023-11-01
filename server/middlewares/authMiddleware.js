const e = require("express");

const { getUserFromEmail} = require("../firebase/manageRealtimeDatabase");
const { verifySession } = require("../utils/sessionUtils");

exports.verifyEmail = (req, res, next) => {
    const { username } = req.body;
    // verify that username is meeting the email pattern cretieria
    // on top of that email should not contain any special characters other than .

    if (username != undefined) {
        if (username.match(/^[a-zA-Z0-9.]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,4}$/)) {
            next();
        }
        else {
            res.status(401).json({ message: 'Invalid Username : error parsing the email > email cannot contain any special characters other than . (dot)' });
        }
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

    if (uid != undefined) {
        if (verifySession(uid))
        {
          next();
        }
        else {
            res.status(401).json({ message: 'Invalid Session : error parsing the session > no active session found ' });
        } 
    }
        else {
            res.status(400).json({ message: 'Bad Request : Try Again' });
        }
    
}
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');
const {verifySignUpCreds,verifyUsernamePassword,verifySession} = require('../middlewares/authMiddleware.js');


router.post('/signup',verifySignUpCreds, (req, res) => {
   // redirect auth.js to authController.js
   console.log("auth.js => redirecting to authController.js");
    authController.newUser(req, res);
  });

router.post('/login', verifyUsernamePassword, (req, res) => {
   // redirect auth.js to authController.js
    authController.loginUser(req, res);
  });

  
router.post('/logout', verifySession, (req, res) => {
  // redirect auth.js to authController.js
   authController.logout(req, res);
 });

router.post('/', verifySession, (req, res) => {
  // redirect auth.js to authController.js
   authController.verify(req, res);
 });


module.exports = router;

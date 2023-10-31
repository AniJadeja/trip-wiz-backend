const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');


router.post('/authenticate',authMiddleware.verifyEmail, (req, res) => {
   // redirect auth.js to authController.js
    authController.newUser(req, res);
  });

router.post('/authenticate/login', authMiddleware.verifyUsernamePassword, (req, res) => {
   // redirect auth.js to authController.js
    authController.loginUser(req, res);
  });


module.exports = router;

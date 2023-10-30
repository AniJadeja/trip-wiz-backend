const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');


router.post('/authenticate', authMiddleware.verifyAccessToken, (req, res) => {
   // redirect auth.js to authController.js
    authController.authenticate(req, res);
  });
  
  module.exports = router;

module.exports = router;

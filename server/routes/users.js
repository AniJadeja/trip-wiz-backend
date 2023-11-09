const express = require('express');
const router = express.Router();
const databaseController = require('../controllers/databaseController.js');
const databaseMiddleware = require('../middlewares/databaseMiddleware.js');
const authMiddleware = require('../middlewares/authMiddleware.js');


router.post('/user',
  authMiddleware.verifySession,
  databaseMiddleware.verifyUpdateRequest, (req, res) => {
   // redirect auth.js to authController.js
    databaseController.updateUserData(req, res);
  });


router.post('/',
  authMiddleware.verifySession, (req, res) => {
   // redirect auth.js to authController.js

   databaseController.getUserData(req, res);
  });

module.exports = router;

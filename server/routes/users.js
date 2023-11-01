const express = require('express');
const router = express.Router();
const databaseController = require('../controllers/databaseController.js');
const databaseMiddleware = require('../middlewares/databaseMiddleware.js');


router.post('/user',databaseMiddleware.verifyUpdateRequest, (req, res) => {
   // redirect auth.js to authController.js
    databaseController.updateUserData(req, res);
  });

module.exports = router;

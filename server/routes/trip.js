const express = require('express');
const router = express.Router();
const itineraryMiddleware = require('../middlewares/itineraryMiddleware.js');
const authMiddleware = require('../middlewares/authMiddleware.js');
const itineraryController = require('../controllers/itineraryController.js');


router.post('/',authMiddleware.verifySession,itineraryMiddleware.verifyItenary, (req, res) => {
    // redirect auth.js to authController.js
    itineraryController.generateItinerary(req, res);
   });

   module.exports = router;
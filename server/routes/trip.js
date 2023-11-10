const express = require('express');
const router = express.Router();
const itineraryMiddleware = require('../middlewares/itineraryMiddleware.js');
const authMiddleware = require('../middlewares/authMiddleware.js');
const itineraryController = require('../controllers/itineraryController.js');
const databaseController = require('../controllers/databaseController.js');
const firestoreController = require('../controllers/firestoreController.js');


router.post('/',authMiddleware.verifySession,itineraryMiddleware.verifyItenary, (req, res) => {
    // redirect auth.js to authController.js
    itineraryController.generateItinerary(req, res);
   });

   module.exports = router;

router.post('/save',authMiddleware.verifySession, (req, res) => {
    // redirect auth.js to authController.js
    databaseController.saveUserItinerary(req, res);
   });

router.post('/trips',authMiddleware.verifySession, (req, res) => {
    console.log("trip.js => trying to get user itineraries");
    // redirect auth.js to authController.js
    firestoreController.getUserItinerariesInCollection(req, res);
   });

   module.exports = router;
const {saveUserItinerary} = require('../firebase/manageFirestoreDatabase.js');
const {getUserItineraries} = require('../firebase/manageFirestoreDatabase.js');


// method to accept the user id and then
// pass it to saveUserItinerary method

exports.saveUserItineraryInCollection = (uid,itinerary, res) => {
   
    console.log(`firestoreController => uid > ${uid}`)
    saveUserItinerary(uid, itinerary).then(() => {
        
      res.status(200).json({ message: 'User itinerary saved successfully' });
    })
    .catch((error) => {
      // Handle any errors that occur during user creation
      res.status(400).json({ message: 'User itinerary save failed : error saving user itinerary > ', error: error.message });
    });
  }

  exports.getUserItinerariesInCollection = (req, res) => {

    console.log(`firestoreController => called getUserItinerariesInCollection`);
    const { uid } = req.body;

    return new Promise((resolve, reject) => {
        console.log(`firestoreController => calling getUserItineraries`);
        getUserItineraries(uid).then((itineraries) => {
        resolve(itineraries);
        res.status(200).json({ message: 'User itineraries retrieved successfully.', itineraries : itineraries });
      }).catch((error) => {
        reject(error);
        res.status(400).json({ message: 'User itineraries retrieval failed : error retrieving user itineraries > ', error: error.message });
      });
    });
  }
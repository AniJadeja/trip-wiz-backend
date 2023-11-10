const { updateUserInDatabase, getUserFromUid,getUserItinerary } = require('../firebase/manageRealtimeDatabase.js'); 
const { retrieveSession } = require('../session/sessionUtils.js');
const {saveUserItineraryInCollection} = require('./firestoreController.js');


exports.updateUserData = (req, res) => {
    
    const { uid, data } = req.body;

    const userData = { data };

    // console log the data here

    //console.log("databaseController => updateUserData : data > ", data);

    //console.log("databaseController => updateUserData : userData > ", userData.data);

    // verify session

    if(retrieveSession(uid) === undefined){
        res.status(401).json({ message: 'User data update failed : unauthorized' });
        return;
    }

    updateUserInDatabase(uid, userData.data).then(() => {
        res.status(200).json({ message: 'User data updated successfully' });
        })
        .catch((error) => {
          // Handle any errors that occur during user creation
          res.status(400).json({ message: 'User data update failed : error updating user data > ', error: error.message });
        }); 
  };



  exports.getUserData = (req, res) => { 
    const { uid } = req.body;

    console.log("databaseController => getUserData : uid > ", uid);
    getUserFromUid(uid).then((user) => {
      console.log("databaseController => getUserData : user > ", user);
      res.status(200).json({ message: 'User data retrieved successfully. \n userData > ' + user });
    }).catch((error) => { 
      console.log("databaseController => getUserData : error > ", error);
      res.status(400).json({ message: 'User data retrieval failed : error retrieving user data > ', error: error.message });
    });
  };

  exports.saveUserItinerary = (req, res) => {

    const { uid } = req.body;
    getUserItinerary(uid).then((itinerary) => {
      console.log("databaseController => saveUserItinerary : itinerary > ", itinerary);
      saveUserItineraryInCollection(uid, itinerary, res);
    });
  }
const { updateUserInDatabase } = require('../firebase/manageRealtimeDatabase.js'); 
const { verifySession } = require('../utils/sessionUtils.js');


exports.updateUserData = (req, res) => {
    
    const { uid, data } = req.body;

    const userData = { data };

    // console log the data here

    console.log("databaseController => updateUserData : data > ", data);

    console.log("databaseController => updateUserData : userData > ", userData.data);

    // verify session

    if(!verifySession(uid)){
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

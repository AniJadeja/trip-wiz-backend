
const { updateUserInDatabase } = require('../firebase/manageRealtimeDatabase.js'); 


exports.updateUserData = (req, res) => {
 
    const { uid, data } = req.body;
  
    updateUserInDatabase(uid, data).then(() => {
        res.status(200).json({ message: 'User data updated successfully' });
        })
        .catch((error) => {
          // Handle any errors that occur during user creation
          res.status(400).json({ message: 'User data update failed : error updating user data > ', error: error.message });
        }); 
  };

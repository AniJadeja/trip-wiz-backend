const {initiateSession, removeSession, verifySession} = require('../firebase/manageRealtimeDatabase');

function updateSession(uid, expiration) {

  return new Promise((resolve, reject) => {
    if (!uid) {
      reject(new Error('Invalid uid'));
    }
    initiateSession(uid, expiration)
      .then(() => {
        console.log('sessionUtils => updateSession: Successfully initiated session for ' + uid + ' in the database');
        verifySession(uid).then((snapshot) => {
          console.log('sessionUtils => updateSession: Session expiration is ' + snapshot.val());
          resolve('success');
        });
        
      })
      .catch((error) => {
        console.log('sessionUtils => updateSession: Error initiating session:', error);
        throw error; // Throw the error to propagate it
      });
  });
  }


function deleteSession(uid) {
     
    return new Promise((resolve, reject) => {
      removeSession(uid)
        .then(() => {
          console.log('sessionUtils => deleteSession: Successfully deleted session for ' + uid + ' in the database');
          resolve('success');
        })
        .catch((error) => {
          console.log('sessionUtils => deleteSession: Error deleting session:', error);
          reject(error); // Throw the error to propagate it
        });
    });
}

function retrieveSession(uid) {

  // returns the expiration of the uid session from reatime database

  return new Promise((resolve, reject) => {
    if (!uid) {
      reject(new Error('Invalid uid'));
    }
    verifySession(uid)
      .then((sessionExists) => {
        if (sessionExists) {
          resolve('success');
        } else {
          reject(new Error('Invalid uid'));
        }
      })
      .catch((error) => {
        console.log('sessionUtils => retrieveSession: Error retrieving session:', error);
        throw error; // Throw the error to propagate it
      });
  });

  
}




module.exports = { updateSession, deleteSession, retrieveSession};
const { admin } = require('./firebaseConfig.js');
const { updateSession } = require('../utils/sessionUtils.js');


exports.loginUser = (uid) => {
  return new Promise((resolve, reject) => {
    // get the current time in milliseconds
    const now = new Date();
    const currentTimestamp = now.getTime();
   // const expiration = 259200000; // 72 hours in milliseconds
    const expiration = 15000; // 72 hours in milliseconds
    
    if(!this.getUser(uid).disabled){
      updateSession(uid, currentTimestamp + expiration);
      resolve(expiration);
    }
    else{
      reject("ManageUsers => loginUser : User does not have authorization.");
    }

  });
};

exports.createUser = (username, password) => {
  return admin.auth().createUser({
    email: username,
    password: password,
  })
    .then((userRecord) => {
      console.log('ManageUsers => createUser : Successfully created new user');
      return userRecord;
    })
    .catch((error) => {
      console.log('ManageUsers => createUser : Error creating new user:', error);
      throw error; 
    });
};

exports.deleteUser = (uid) => {

  return admin.auth().deleteUser(uid)
    .then(() => {
      console.log('ManageUsers => deleteUser : Successfully deleted user');
    })
    .catch((error) => {
      console.log('ManageUsers => deleteUser : Error deleting user:', error);
      throw error;
    });
};

exports.getUser = (uid) => {
  console.log("ManageUsers => getUser : uid > " + uid);
  
  return admin.auth().getUser(uid)
    .then((userRecord) => {
      console.log('ManageUsers => getUser : retrieved user');
      return userRecord;
    })
    .catch((error) => {
      console.log('ManageUsers => getUser : Error fetching user data:', error);
      throw error;
    });
}

exports.updateUser = (uid, data) => {
  return admin.auth().updateUser(uid, data)
    .then((userRecord) => {
      console.log('ManageUsers => updateUser : Successfully updated user', userRecord.toJSON());
      return userRecord;
    })
    .catch((error) => {
      console.log('ManageUsers => updateUser : Error updating user:', error);
      throw error; 
    });
}


exports.disableUser = (uid) => {
  return admin.auth().updateUser(uid, {
    disabled: true
  })
    .then((userRecord) => {
      console.log('ManageUsers => disableUser : Successfully disabled user', userRecord.toJSON());
      return userRecord;
    })
    .catch((error) => {
      console.log('ManageUsers => disableUser : Error disabling user:', error);
      throw error;
    });
}



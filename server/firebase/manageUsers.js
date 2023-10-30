// manageUsers.js
const admin = require('./firebaseConfig.js');

const db = admin.firestore();

exports.createUser = (username, password) => {
  // firebase user creation starts here
  // start writing code below
  return admin.auth().createUser({
    email: username,
    password: password,
  })
    .then((userRecord) => {
      console.log('Successfully created new user:', userRecord.uid);
      return userRecord;
    })
    .catch((error) => {
      console.log('Error creating new user:', error);
      throw error; // Throw the error to propagate it
    });
};

exports.deleteUser = (uid) => {
  // firebase user deletion starts here
  // start writing code below
  return admin.auth().deleteUser(uid)
    .then(() => {
      console.log('Successfully deleted user');
    })
    .catch((error) => {
      console.log('Error deleting user:', error);
      throw error; // Throw the error to propagate it
    });
};

exports.getUser = (uid) => {
  // firebase user retrieval starts here
  // start writing code below
  return admin.auth().getUser(uid)
    .then((userRecord) => {
      console.log('Successfully fetched user data:', userRecord.toJSON());
      return userRecord;
    })
    .catch((error) => {
      console.log('Error fetching user data:', error);
      throw error; // Throw the error to propagate it
    });
}

exports.updateUser = (uid, data) => {
  // firebase user update starts here
  // start writing code below
  return admin.auth().updateUser(uid, data)
    .then((userRecord) => {
      console.log('Successfully updated user', userRecord.toJSON());
      return userRecord;
    })
    .catch((error) => {
      console.log('Error updating user:', error);
      throw error; // Throw the error to propagate it
    });
}



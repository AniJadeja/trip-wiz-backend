// This module manages the realtime database of firebase 
// using the firebase admin sdk

 const { realtimeDB } = require('./firebaseConfig');


// Function to create a new user in the realtime database
exports.createUserInDatabase = (uid, username, password) => {


    return new Promise((resolve, reject) => {

        // Check if uid, displayName, and dateOfBirth are defined
        if (uid != undefined) {
            if (username != undefined) {
                if (password != undefined) {
                    return realtimeDB.ref('users/' + uid).set({
                        uid: uid,
                        username: username,
                        password: password
                    })
                        .then(() => {
                            const emailPath = username.replace(/\./g, '_');
                            realtimeDB.ref(`emailToUid/${emailPath}`).set(uid)
                                .then(() => {
                                    console.log('manageRealtimeDatabase => createUserInDatabase : Successfully created email to UID mapping in the database');
                                    resolve(uid);
                                })
                                .catch((error) => {
                                    console.error('manageRealtimeDatabase => createUserInDatabase : Error creating email to UID mapping:', error);
                                });
                            console.log('manageRealtimeDatabase => createUserInDatabase : Successfully created new user in the database');
                            // You can also set the "username" property here if needed
                        })
                        .catch((error) => {
                            console.log('manageRealtimeDatabase => createUserInDatabase : Error creating new user:', error);
                            throw error; // Throw the error to propagate it
                        });
                }
                else {
                    console.log('manageRealtimeDatabase => createUserInDatabase : password is undefined');
                    reject('Invalid password for user creation');
                }
            }
            else {
                console.log('manageRealtimeDatabase => createUserInDatabase : username is undefined');
                reject('Invalid username for user creation');
            }
        }
        else {
            console.log('manageRealtimeDatabase => createUserInDatabase : uid is undefined');
            reject('Invalid uid for user creation');
        }




    });



}


exports.createGoogleUserInDatabase = (uid, email) => {
    console.log('manageRealtimeDatabase => createGoogleUserInDatabase : uid > ', uid);
    console.log('manageRealtimeDatabase => createGoogleUserInDatabase : email > ', email);
    return new Promise((resolve, reject) => {
        // Check if uid, displayName, and dateOfBirth are defined
        if (uid != undefined) {
            if (email != undefined) {
                    return realtimeDB.ref('users/' + uid).set({
                        uid: uid,
                        username: email
                    })
                        .then(() => {
                            const emailPath = email.replace(/\./g, '_');
                            realtimeDB.ref(`emailToUid/${emailPath}`).set(uid)
                                .then(() => {
                                    console.log('manageRealtimeDatabase => createGoogleUserInDatabase : Successfully created email to UID mapping in the database');
                                    resolve(uid);
                                })
                                .catch((error) => {
                                    console.error('manageRealtimeDatabase => createGoogleUserInDatabase : Error creating email to UID mapping:', error);
                                });
                            console.log('manageRealtimeDatabase => createGoogleUserInDatabase : Successfully created new user in the database');
                            // You can also set the "username" property here if needed
                        })
                        .catch((error) => {
                            console.log('manageRealtimeDatabase => createGoogleUserInDatabase : Error creating new user:', error);
                            throw error; // Throw the error to propagate it
                        });

            }
            else {
                console.log('manageRealtimeDatabase => createGoogleUserInDatabase : username is undefined');
                reject('Invalid username for user creation');
            }
        }
        else {
            console.log('createGoogleUserInDatabase => createUserInDatabase : uid is undefined');
            reject('Invalid uid for user creation');
        }
    });
}


// Function to update  a new user in the realtime database
exports.updateUserInDatabase = (uid, data) => {


    return new Promise((resolve, reject) => {
        if (!data) {
            reject(new Error('Invalid data for user update'));
        }
        // Check if uid, displayName, and dateOfBirth are defined
        realtimeDB.ref('users/' + uid).update(data)
            .then(() => {
                console.log('manageRealtimeDatabase => updateUserInDatabase: Successfully updated user in the database');
                resolve();
            })
            .catch((error) => {
                console.log('manageRealtimeDatabase => updateUserInDatabase: Error updating user:', error);
                throw error; // Throw the error to propagate it
            });
    });
};



exports.getAndUpdateUserItinerary = async (uid, itinerary) => {
    return new Promise((resolve, reject) => {
        // Check if uid, displayName, and dateOfBirth are defined
        realtimeDB.ref('itineraries/' + uid).set(itinerary)
            .then(() => {
                console.log('manageRealtimeDatabase => getAndUpdateUserItinerary: Successfully updated itinenraty for ' + uid + ' in the database');
                resolve();
            })
            .catch((error) => {
                console.log('manageRealtimeDatabase => getAndUpdateUserItinerary: Error updating itineray:', error);
                reject(error); // Throw the error to propagate it
            });
    });
}


exports.getUserItinerary = async (uid) => {
    return new Promise((resolve, reject) => {
        realtimeDB.ref('itineraries/' + uid).once('value').then((snapshot) => {
            const itinerary = snapshot.val();
            resolve(itinerary);
        }).catch((err) => {
            reject(err);
        });
    });
}


exports.initiateSession = async (uid, expiration) => {
    return new Promise((resolve, reject) => {
        // Check if uid, displayName, and dateOfBirth are defined
        realtimeDB.ref('activeSessions/' + uid).set(expiration)
            .then(() => {
                console.log('manageRealtimeDatabase => initiateSession: Successfully initiated session for ' + uid + ' in the database');
                resolve();
            })
            .catch((error) => {
                console.log('manageRealtimeDatabase => initiateSession: Error initiating session:', error);
                reject(error); // Throw the error to propagate it
            });
    });
}

exports.removeSession = async (uid) => {
    return new Promise((resolve, reject) => {
        // Check if uid, displayName, and dateOfBirth are defined
        realtimeDB.ref('activeSessions/' + uid).remove()
            .then(() => {
                console.log('manageRealtimeDatabase => removeSession: Successfully deleted session for ' + uid + ' in the database');
                resolve();
            })
            .catch((error) => {
                console.log('manageRealtimeDatabase => removeSession: Error deleting session:', error);
                reject(error); // Throw the error to propagate it
            });
    });
}

exports.verifySession = async (uid) => {
    return new Promise((resolve, reject) => {

        // Check if uid, displayName, and dateOfBirth are defined

        realtimeDB.ref('activeSessions/' + uid).once('value')
            .then((snapshot) => {
                if (snapshot.exists()) {
                    //console.log('manageRealtimeDatabase => verifySession: Session exists for '+ uid +' in the database');
                    //console.log('manageRealtimeDatabase => verifySession: Session expiration is '+ snapshot.val());
                    resolve(snapshot);
                } else {
                    console.log('manageRealtimeDatabase => verifySession: Session does not exist for ' + uid + ' in the database');
                    resolve(null);
                }
            })
            .catch((error) => {
                console.log('manageRealtimeDatabase => verifySession: Error verifying session:', error);
                reject(error);
            });
    });
}



exports.getAllSessionKeys = async () => {
    return new Promise((resolve, reject) => {
        // Check if uid, displayName, and dateOfBirth are defined
        realtimeDB.ref('activeSessions/').on('value', (snapshot) => {
            resolve(snapshot.val());
        }, (errorObject) => {
            console.log('The read failed: ' + errorObject.name);
            reject(errorObject.message)
        });
    });
}




exports.getUserFromUid = (uid) => {
    return new Promise((resolve, reject) => {
        console.log('manageRealtimeDatabase => getUserFromUid : uid > ', uid);
        realtimeDB.ref(`users/${uid}`).on('value', (snapshot) => {
            const userData = snapshot.val();
            resolve(userData);
        }, (errorObject) => {
            console.error('manageRealtimeDatabase => updateUserInDatabase : Error reading user data:', error);
            reject(errorObject.message);
        });
    });

};

exports.getUserFromDatabase = (uid) => {
    return new Promise((resolve, reject) => {
       // console.log('manageRealtimeDatabase => getUserFromUid : uid > ', uid);
        realtimeDB.ref(`users/${uid}`).on('value', (snapshot) => {
            const userData = snapshot.val();
            delete userData.password;
            delete userData.uid;
            delete userData.dateOfCreation;
            delete userData.savedTrips;
            delete userData.savedTripsUrl;
            resolve(JSON.stringify(userData));
        }, (errorObject) => {
            console.error('manageRealtimeDatabase => updateUserInDatabase : Error reading user data:', error);
            reject(errorObject.message);
        });
    });

};

exports.getUserFromEmail = async (email) => {
    const emailPath = email.replace(/\./g, '_');

    try {
        const snapshot = await realtimeDB.ref(`emailToUid/${emailPath}`).once('value');
        const uid = snapshot.val();
        console.log("manageRealtimeDatabase => getUserFromEmail : " + uid + " is the uid");

        const user = await this.getUserFromUid(uid);
        return user;
    } catch (error) {
        console.error('manageRealtimeDatabase => getUserFromEmail : Error getting user from email:', error);
        throw error;
    }
};


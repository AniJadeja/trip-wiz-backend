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
    return new Promise ((resolve, reject) => {
        if (!itinerary) {
            reject(new Error('Invalid data for itinerary update'));
        }
        // Check if uid, displayName, and dateOfBirth are defined
        realtimeDB.ref('itineraries/' + uid).set(itinerary)
        .then(() => {
            console.log('manageRealtimeDatabase => getAndUpdateUserItinerary: Successfully updated itinenraty for '+ uid +' in the database');
           resolve();
        })
        .catch((error) => {
            console.log('manageRealtimeDatabase => getAndUpdateUserItinerary: Error updating itineray:', error);
            throw error; // Throw the error to propagate it
        });
    });
} 

exports.getAndUpdateSession = async (uid, itinerary) => {
    return new Promise ((resolve, reject) => {
        if (!itinerary) {
            reject(new Error('Invalid data for itinerary update'));
        }
        // Check if uid, displayName, and dateOfBirth are defined
        realtimeDB.ref('itineraries/' + uid).update(itinerary)
        .then(() => {
            console.log('manageRealtimeDatabase => getAndUpdateUserItinerary: Successfully updated itinenraty for '+ uid +' in the database');
           resolve();
        })
        .catch((error) => {
            console.log('manageRealtimeDatabase => getAndUpdateUserItinerary: Error updating itineray:', error);
            throw error; // Throw the error to propagate it
        });
    });
} 


exports.getUserFromUid = (uid) => {
    return realtimeDB.ref(`users/${uid}`).once('value')
        .then((snapshot) => {
            // The data is available in the snapshot
            const userData = snapshot.val();
            //console.log('User data:', userData);
            return userData;
        })
        .catch((error) => {
            console.error('manageRealtimeDatabase => updateUserInDatabase : Error reading user data:', error);
            throw error;
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

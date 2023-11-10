// This module manages the firestore database of firebase
// using the firebase admin sdk


const { firestore } = require('./firebaseConfig');

const usersCollection = firestore.collection('UsersCollection');

// method to accept the userid and itinerary and then
// save it to the firestore database under the user's
// document which is identified by the userid
// and is the subpart of usersCollection








exports.saveUserItinerary = (uid, itinerary) => {

    // const uidDocRef = usersCollection.doc(uid);
    // console.log("manageFirestoreDatabase => saveUserItinerary : uidDocRef > ", uid);
    // const usersSavedItinerariesDocRef = uidDocRef.collection('ItinerariesCollection').doc('SavedItineraries');
    // const field = itinerary.trip_details.id;
    // const value = itinerary;


    // Replace 'yourCollection' with the desired collection name
    const usersCollectionName = 'UsersCollection';
    const itinerariesCollectionName = 'ItinerariesCollection';
    const savedItinerariesDocumentId = 'SavedItineraries';

    // Replace 'yourDocumentId' with the desired document ID
   

    // Replace 'yourField' with the desired field name
    const fieldName = itinerary.trip_details.id;

    // Replace 'yourValue' with the desired field value
    const fieldValue = itinerary;
    

    const usersCollectionRef = firestore.collection(usersCollectionName);
    const uidDocumentRef = usersCollectionRef.doc(uid);


    // Reference to the collection
    const itinerariesCollectionRef = uidDocumentRef.collection(itinerariesCollectionName);

    // Reference to the document inside the collection
    const savedItinerariesDocumentRef = itinerariesCollectionRef.doc(savedItinerariesDocumentId);


    return new Promise((resolve, reject) => {
        // Set the field and value in the document
        savedItinerariesDocumentRef.get()
        .then((docSnapshot) => {
          if (docSnapshot.exists) {
            // If the document exists, get its data
            const existingData = docSnapshot.data() || {};
      
            // Modify the data by adding the new field and value
            existingData[fieldName] = fieldValue;
      
            // Set the updated data back to the document
            return savedItinerariesDocumentRef.set(existingData);
          } else {
            // If the document doesn't exist, create a new one with the specified field and value
            return savedItinerariesDocumentRef.set({ [fieldName]: fieldValue });
          }
        })
            .then(() => {
                resolve();
                console.log('Document successfully written!');
            })
            .catch((error) => {
                reject(error);
                console.error('Error writing document: ', error);
            });
    })





    // return new Promise((resolve, reject) => {
    //     usersSavedItinerariesDocRef.doc(uid).set({ [field]: value })
    //     .then(() => {
    //         console.log('manageFirestoreDatabase => saveUserItinerary : Successfully saved user itinerary in the database');
    //         resolve();
    //     })
    //     .catch((error) => {
    //         console.error('manageFirestoreDatabase => saveUserItinerary : Error saving user itinerary:', error);
    //         reject(error);
    //     });
    // });
};

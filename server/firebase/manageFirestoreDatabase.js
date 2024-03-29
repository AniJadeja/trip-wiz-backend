// This module manages the firestore database of firebase
// using the firebase admin sdk


const { firestore } = require('./firebaseConfig');

const usersCollectionName = 'UsersCollection';
const itinerariesCollectionName = 'ItinerariesCollection';
const savedItinerariesDocumentId = 'SavedItineraries';


function generateUserItineraryDocumentId(uid) {

    const usersCollectionRef = firestore.collection(usersCollectionName);
    const uidDocumentRef = usersCollectionRef.doc(uid);
    const itinerariesCollectionRef = uidDocumentRef.collection(itinerariesCollectionName);
    const savedItinerariesDocumentRef = itinerariesCollectionRef.doc(savedItinerariesDocumentId);
    return savedItinerariesDocumentRef;

}

exports.saveUserItinerary = (uid, itinerary) => {

    const fieldName = itinerary.trip_details.id;
    const fieldValue = itinerary;

    uidDocumentRef = generateUserItineraryDocumentId(uid);

    return new Promise((resolve, reject) => {

        // Use get() to check if the document exists
        uidDocumentRef.get().then((doc) => {
            if (doc.exists) {
                // Document exists, update the existing data
                return uidDocumentRef.set({ [fieldName]: fieldValue }, { merge: true });
            } else {
                // Document doesn't exist, create a new one
                return uidDocumentRef.set({ [fieldName]: fieldValue });
            }
        }).then(() => {
            resolve();
            console.log('Document successfully written!');
        }).catch((error) => {
            reject(error);
            console.error('Error writing document: ', error);
        });
    });
};







// exports.saveUserItinerary = (uid, itinerary) => {

//     const fieldName = itinerary.trip_details.id;
//     const fieldValue = itinerary;

//     uidDocumentRef = generateUserItineraryDocumentId(uid);

//     return new Promise((resolve, reject) => {

//         this.getUserItineraries(uid).then((itineraries) => {
//             if (itineraries !== undefined && itineraries !== null) {
//                 const existingData = itineraries || {};
//                 existingData[fieldName] = fieldValue;
//                 return uidDocumentRef.set(existingData);
//             }
//              else {
//             return uidDocumentRef.set({ [fieldName]: fieldValue });}
//         }).then(() => {
//             resolve();
//             console.log('Document successfully written!');
//         })
//         .catch((error) => {
//             reject(error);
//             console.error('Error writing document: ', error);
//         });
// })
// };







exports.getUserItineraries = (uid) => {

    uidDocumentRef = generateUserItineraryDocumentId(uid);

    return new Promise((resolve, reject) => {
        uidDocumentRef.get()
            .then((doc) => {
                if (doc.exists) {
                    resolve(doc.data());
                  
                } else {
                    trips = {"itineraries": []};
                    // doc.data() will be undefined in this case
                    console.log('mangeFirestoreDatabase => No such document!');
                    resolve(trips)
                }
            }).catch((error) => {
                reject(error);
                console.log('mangeFirestoreDatabase => Error getting document:', error);
            });
    })
};

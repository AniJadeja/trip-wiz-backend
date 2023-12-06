// This module is a controller for itinerary generation.
const axios = require('axios');

const ItineraryModel = require("../models/itineraryModel");
const ItineraryCall = require("../openAI/itinerary.js");
const {
  getAndUpdateUserItinerary,
} = require("../firebase/manageRealtimeDatabase.js");
const { validateAndConvertToJSON } = require("../utils/jsonValidator.js");

exports.generateItinerary = async (req, res) => {
  console.log(
    `itineraryController => Itinerary Model: ${JSON.stringify(req.body)}`
  );
  const data = req.body;
  console.log(`itineraryController => data.uid : ${data.uid}`);
  const itineraryModel = new ItineraryModel({
    uid: data.uid,
    destination: data.destination,
    startDate: data.startDate,
    endDate: data.endDate,
    placesToVisit: data.placesToVisit,
    tripType: data.tripType,
    numberOfDays: data.numberOfDays,
  });

  const itinerary = new ItineraryCall(itineraryModel);
  console.log(
    "itineraryController => before generateItinerary uid: " + itineraryModel.uid
  );
  itinerary
    .generateItinerary()
    .then(async (itinerary) => {
      let itineraryJSON = validateAndConvertToJSON(itinerary);

      console.log("Adding a phoptoUrl to each place");
      itineraryJSON.trip_details.itinerary = await Promise.all(
        itineraryJSON.trip_details.itinerary.map(async (day) => ({
          ...day,
          places: await Promise.all(
            day.places.map(async (place) => ({
              ...place,
              photoUrl: await this.getPhotoURL(place.name, itineraryModel.destination).catch(() => ""),
            }))
          ),
        }))
      );
      const uid = itineraryModel.uid;
      console.log(
        `itineraryController => did call generateItinerary() sucessfully`
      );
      console.log(`itineraryController => updating itinerary in the database`);

      getAndUpdateUserItinerary(uid, itineraryJSON)
        .then(() => {
          console.log(
            "itineraryController => itinerary updated in the database"
          );
          res.status(200).json({
            message: "Itinerary Generated Sucessfully",
            itinerary: `${JSON.stringify(itineraryJSON)}`,
          });
        })
        .catch((err) => {
          console.log(
            `itineraryController => Error updating the itinerary in the database: ${err}`
          );
          res.status(500).json({
            message: "Error updating the itinerary in the database",
            suggestedAction:
              "Please try again later or contact the administrator.",
          });
        });
    })
    .catch((err) => {
      console.log(
        `itineraryController => Error generating the itinerary: ${err}`
      );
      res.status(500).json({
        message: "Error generating the itinerary",
        suggestedAction: "Please try again later or contact the administrator.",
      });
    });
};

function getLatestItinerary(uid) {
  return new Promise((resolve, reject) => {
    realtimeDB
      .ref("itineraries/" + uid)
      .once("value")
      .then((snapshot) => {
        const itinerary = snapshot.val();
        resolve(itinerary);
      })
      .catch((err) => {
        reject(err);
      });
  });
}




function getPhoto(photoReference) {
  console.log(`placesApi => \tgetPhoto getting photo for photoReference`);
  if (!photoReference) {
      return "https://fakeimg.pl/600x400";
  }

  return new Promise((resolve, reject) => {

    console.log(`placesApi => \tgetPhoto making api call to get photo url`);
      const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=AIzaSyCjlDOrP5yS4NIwDJkUFFN5CZNuweqR8PA`;


      axios.get(url)
          .then((response) => {
              if (!response.ok) {
                  console.log(`placesApi => \tgetPhoto error getting photo url`);
              }

              console.log(`placesApi => \tgetPhoto got data`);
              const { ...rest } = response;
              const url = rest.request.res.responseUrl;
              console.log(`placesApi => \tgetPhoto url: ${url}`);
              resolve(url);
          })
          .catch((err) => {
              reject(err);
          });
  });
}

function getPhotoReference(name) {
  console.log(`placesApi => \tgetPhotoReference getting photo for place: ${name}`);
  return new Promise((resolve, reject) => {

      const apiUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${name}&key=AIzaSyCjlDOrP5yS4NIwDJkUFFN5CZNuweqR8PA`

      console.log(`placesApi => \tmaking api call to get photo reference`);
      fetch(apiUrl)
          .then((response) => {
              if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
              }
              
          })
          .then((data) => {
              console.log(`placeApi => \tgot data..`);
              const { ...rest } = data;
              console.log(`placesApi => \tgetPhotoReference data: ${rest}`);
        
              const results = rest.results;
              let photoReference = null;

              for (const result of results) {
     
                  if (result.photos && result.photos.length > 0) {
                      photoReference = result.photos[0].photo_reference;
                      break; 
                  }
              }
              resolve(photoReference);
              return photoReference;
          })
          .catch((err) => {
              reject(err);
          });
  });
}


exports.getPhotoURL = (place, destination) => {
  console.log(`placesApi => getPhotoURL getting photo for place: ${place}`);
  return new Promise((resolve, reject) => {
      getPhotoReference(place+" "+destination)
          .then((photo_reference) => {
              getPhoto(photo_reference)
                  .then((photo) => {
                      console.log(`placesApi => getPhotoURL photo: ${photo}`);
                      resolve(photo);
                      return photo;
                  }).catch((err) => {
                      reject(err);
                  });
              return photo_reference;
          }).catch((err) => {
              reject(err);
          });
  });
}




exports.getItinerary = async (req, res) => {};

exports.saveItinerary = async (req, res) => {};

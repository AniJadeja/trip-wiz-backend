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
              photoUrl: await this.getPhotoURL(place.name).catch(() => ""),
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
  if (!photoReference) {
      return "https://fakeimg.pl/600x400";
  }

  return new Promise((resolve, reject) => {
      const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=AIzaSyCjlDOrP5yS4NIwDJkUFFN5CZNuweqR8PA`;


      axios.get(url)
          .then((response) => {
              const { ...rest } = response;
              const url = rest.request.res.responseUrl;
              resolve(url);
          })
          .catch((err) => {
              reject(err);
          });
  });
}

function getPhotoReference(name) {
  return new Promise((resolve, reject) => {

      const apiUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${name}&key=AIzaSyCjlDOrP5yS4NIwDJkUFFN5CZNuweqR8PA`


      fetch(apiUrl)
          .then((response) => {
              if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
              }
              return response.json();
          })
          .then((data) => {
              const { ...rest } = data;
              console.log(`placesApi => getPhotoReference data: ${rest}`);
        
              const results = rest.results;
              let photoReference = null;

              for (const result of results) {
     
                  if (result.photos && result.photos.length > 0) {
                      photoReference = result.photos[0].photo_reference;
                      break; 
                  }
              }
              resolve(photoReference);
          })
          .catch((err) => {
              reject(err);
          });
  });
}


exports.getPhotoURL = (place) => {
  console.log(`placesApi => getPhotoURL getting photo for place: ${place}`);
  return new Promise((resolve, reject) => {
      getPhotoReference(place)
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

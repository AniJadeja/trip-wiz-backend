// This module is a controller for itinerary generation.

const ItineraryModel = require("../models/itineraryModel");
const ItineraryCall = require("../openAI/itinerary.js");
const {
  getAndUpdateUserItinerary,
} = require("../firebase/manageRealtimeDatabase.js");
const { validateAndConvertToJSON } = require("../utils/jsonValidator.js");
const { getPhotoURL } = require("../google/placesAPI.js");

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

      itineraryJSON.trip_details.itinerary = await Promise.all(
        itineraryJSON.trip_details.itinerary.map(async (day) => ({
          ...day,
          places: await Promise.all(
            day.places.map(async (place) => ({
              ...place,
              photoUrl: await getPhotoURL(place.name).catch(() => ""),
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

exports.getItinerary = async (req, res) => {};

exports.saveItinerary = async (req, res) => {};

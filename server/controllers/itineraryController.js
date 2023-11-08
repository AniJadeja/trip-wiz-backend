// This module is a controller for itinerary generation.

const ItineraryModel = require('../models/itineraryModel');
const Itinerary = require('../openAI/itinerary.js');
const {getAndUpdateUserItinerary} = require('../firebase/manageRealtimeDatabase.js');


exports.generateItinerary = async (req, res) => {

    console.log(`itineraryController => Itinerary Model: ${JSON.stringify(req.body)}`)
    const data = req.body;
    console.log(`itineraryController => data.uid : ${data.uid}`)
    const itineraryModel = new ItineraryModel({
        uid: data.uid,
        destination: data.destination,
        startDate: data.startDate,
        endDate: data.endDate,
        placesToVisit: data.placesToVisit,
        tripType: data.tripType,
        numberOfDays: data.numberOfDays,
    });

    const itinerary = new Itinerary(itineraryModel);
    console.log('itineraryController => before generateItinerary uid: ' + itineraryModel.uid);
    itinerary.generateItinerary().then((itinerary) => {
        const uid = itineraryModel.uid;
        console.log(`itineraryController => did call generateItinerary() sucessfully`);
        console.log(`itineraryController => generateItnerary uid : ${uid}`);
        //console.log(`itineraryController => itinerary: ${itinerary}`);

        // Update the user's itinerary in the realtime database
        console.log(`itineraryController => itinerary createed: ${itinerary}`);
        console.log(`itineraryController => updating itinerary in the database`);
        getAndUpdateUserItinerary(uid, JSON.parse(itinerary)).then(() => {
          res.status(200).json({ message: 'Itinerary Generated Sucessfully', itinerary: `${itinerary}` });
          console.log('itineraryController => itinerary updated in the database');
        });


       
    })
        .catch((err) => {
            console.log(`itineraryController => Error generating the itinerary: ${err}`)
            res.status(500).json({ message: 'Error generating the itinerary', suggestedAction: 'Please try again later or contact the administrator.' });
        }
        );
}


/*
const apiUrl = 'http://localhost:3000/trip';

// Define the data you want to send in the request body
const requestData = {
    "uid" : "lHVI5FakcFWCex04MWVdZPuHZ0x2",
    "destination" : "Hamilton",
    "startDate" : "10/10/2023",
    "endDate" : "11/10/2023",
    "placesToVisit" : "6",
    "tripType" : "exploration",
    "numberOfDays" : "2"
};

// Make a POST request with the data
fetch(apiUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json', // Set the content type to JSON
  },
  body: JSON.stringify(requestData), // Convert the data to a JSON string
})
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json(); // Parse the response as JSON
  })
  .then(data => {
    // Handle the response data
    const itineraryString = data.itinerary;
    const itinerary = JSON.parse(itineraryString);

    // Log the parsed itinerary
    console.log('Parsed Itinerary:', itinerary);
      return itinerary;
  })
  .catch(error => {
    // Handle any errors that occurred during the fetch
    console.error('Fetch error:', error);
  });




*/
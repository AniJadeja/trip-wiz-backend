//import OpenAI from "openai";

const OpenAI = require('openai');
const openai = new OpenAI();
const fs = require('fs');

// TODO - remove source,

const numberOfDays = 6;
const placesToVisit = 15;
const destination = 'Ottawa';
const startDate = '10th October';
const endDate = '15th October';
const source = 'Toronto';
const tripType = 'adventurous';





const apiCall = 1;



const responseName = "./response" + apiCall + ".json";
const itineraryName = "./itinerary" + apiCall + ".json";

// Define your request parameters
const instructions = `Generate a ${numberOfDays}-day ${tripType} trip itinerary in JSON format for a visit from ${source} to ${destination} for ${startDate} to ${endDate}. The itinerary should include ${placesToVisit} distinct places to visit, with 3 places planned for each day. Provide information about what travelers should consider when visiting each place, the expected crowd level (Not, highly, moderately, or variable), and any notable attractions nearby. Use concise tags in the tips section. The response should also adapt recommendations based on the tourist season and indicate if online ticket booking is required. Include information about any danger zones or identification requirements.
each description of the place should be at least 70 words long. The description should include the name of the place, a brief description of the place, and a list of tags that describe the place. 

give me 200 words of description for ${destination} and place it in the 'description of the destination'. The includings are the things which will be needed for the trip or needed to make the trip fun. Includings change over the places and you need to find the right balance between too many and too less includings. typically 4 to 5 things needed to make the trip fun.

Structure the response as follows:`


const responseFormat =
  `
{
  "trip_details": {
  "source": "source",
  "destination": "destination",
  "start_date": "start date",
  "end_date": "end date",
  "description": "description of the destination",
  "includings:" "list of includings",
  },
  "itinerary": [
  {
  "day": "Day 1",
  "date": "start date",
  "name": " Name of the Day",
  "highlights": "Highlights of the Day in 10 words",
  "places": [
  {
  "name": "Place 1",
  "description": "Description of Place 1",
  "tips": "Tags for Place 1",
  "crowded": "Expected crowd level at Place 1",
  "famous_nearby": "Famous places nearby Place 1",
  "security_level": "Security level of Place 1",
  "id_required": "ID required for Place 1",
  "danger_zone": "Danger zone for Place 1, if any, otherwise null"
  },
  {
  "name": "Place 2",
  "description": "Description of Place 2",
  "tips": "Tags for Place 2",
  "crowded": "Expected crowd level at Place 2",
  "famous_nearby": "Famous places nearby Place 2",
  "security_level": "Security level of Place 2",
  "id_required": "ID required for Place 2",
  "danger_zone": "Danger zone for Place 2, if any, otherwise null"
  },
  {
  "name": "Place 3",
  "description": "Description of Place 3",
  "tips": "Tags for Place 3",
  "crowded": "Expected crowd level at Place 3",
  "famous_nearby": "Famous places nearby Place 3",
  "security_level": "Security level of Place 3",
  "id_required": "ID required for Place 3",
  "danger_zone": "Danger zone for Place 3, if any, otherwise null"}]}]}
`;

const requestPayload = {
  model: "gpt-3.5-turbo-instruct",
  max_tokens: 3000,
  temperature: 0.2,
  stop: '\n',
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
};

const buildPrompt = (instructions, responseFormat) => {
  return `${instructions}+${responseFormat}`;
}

const data = buildPrompt(instructions, responseFormat);
// requires api key to be set in environment variable OPENAI_API_KEY

async function generateItinerary(data) {
  return new Promise((resolve, reject) => {
    openai.completions.create({
      prompt: data,
      model: requestPayload.model,
      temperature: requestPayload.temperature,
      max_tokens: requestPayload.max_tokens,
      top_p: requestPayload.top_p,
      frequency_penalty: requestPayload.frequency_penalty,
      presence_penalty: requestPayload.presence_penalty,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}


// const examples = [
//   { input: `Generate an itinerary for a trip to ${destination}`, output: '' },
//   { input: `Destination: ${destination}\nStart date: ${startDate}\nEnd date: ${endDate}\n`, output: '' },
// ]
//You can use the function like this:
generateItinerary(data)
  .then((result) => {
    // Handle the result here
    console.log("Response:", result);

    fs.writeFile(responseName,JSON.stringify(result) + "prompt : " + data, (err) => {
      if (err) {
        console.error('Error writing to the file:', err);
      } else {
        console.log('Content has been written to the file.');
      }
    });
    fs.writeFile(itineraryName,result.choices[0].text, (err) => {
      if (err) {
        console.error('Error writing to the file:', err);
      } else {
        console.log('Content has been written to the file.');
      }
    });
  })
  .catch((error) => {
    // Handle errors here
    console.error("Error:", error);
  });


exports.config = { requestPayload, generateItinerary };


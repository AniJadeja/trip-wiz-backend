//import OpenAI from "openai";

const OpenAI = require('openai');
const openai = new OpenAI();



// Define your request parameters
  const instructions = `I want to go to <link>Ottawa</link> and I am Going from 10th october to 15th october. I want this trip to be an <link>Adventures Trip</link>.
  Give me 20 lines description about each and every places. Please Give me Itinerary. I want it in json format. Give me 3 places for each day Give me the response in given format :`

const responseFormat =
`
{
  "trip_details": {
    "destination": destination,
    "start_date": startDate,
    "end_date": endDate
  },
  "itinerary": [
    {
      "day": "Day 1",
      "date": day1,
      "places": [
        {
          "name": name_of_place,
          "description": description_of_place
        },
       {
          "name": name_of_place,
          "description": description_of_place
        },
      ]
    }
  ]
}
`;

const requestPayload = {
  model: "gpt-3.5-turbo-instruct",
  max_tokens: 1500,
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
  const completion = await openai.completions.create({
    prompt: data,
    model : requestPayload.model,
    temperature : requestPayload.temperature,
    max_tokens : requestPayload.max_tokens,
    top_p : requestPayload.top_p,
    frequency_penalty : requestPayload.frequency_penalty,
    presence_penalty : requestPayload.presence_penalty,
  }
  ).then((response) => {
    console.log(response.choices[0].text);
    Promise.resolve(response.choices[0].text);
  }).catch((error) => {
    console.log(error);
  });

}

  // const examples = [
  //   { input: `Generate an itinerary for a trip to ${destination}`, output: '' },
  //   { input: `Destination: ${destination}\nStart date: ${startDate}\nEnd date: ${endDate}\n`, output: '' },
  // ]

generateItinerary(data);


exports.config = { requestPayload, generateItinerary };


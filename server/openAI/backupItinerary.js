// Objective: To generate the itinerary for the trip

//const OpenAI = require('openai');
const itineraryModel = require('../models/itineraryModel.js');
//const openai = new OpenAI();


//const directoryPath = path.join(__dirname, './responses/');


const requestPayload = {
    model: "gpt-3.5-turbo-instruct",
    //model: "gpt-4-1106-preview",
    max_tokens: 3000,
    temperature: 0.8,
    // stop: '\n',
    top_p: 0.8,
    frequency_penalty: 0,
    presence_penalty: 0,
};

let itinerary;

class Iternarary {



    constructor(data) {

        itinerary = new itineraryModel({
            uid: data.uid,
            destination: data.destination,
            startDate: data.startDate,
            endDate: data.endDate,
            placesToVisit: data.placesToVisit,
            tripType: data.tripType,
            numberOfDays: data.numberOfDays,
        });
    }

    buildInstructions() {
        return `Generate a ${itinerary.numberOfDays}-day ${itinerary.tripType} trip itinerary in JSON format for a visit to ${itinerary.destination} for ${itinerary.startDate} to ${itinerary.endDate}. The itinerary should include ${itinerary.placesToVisit} distinct places to visit, with 3 places planned for each day. Provide information about what travelers should consider when visiting each place, the expected crowd level (Not, highly, moderately, or variable), and any notable attractions nearby. Use concise tags in the tips section. The response should also adapt recommendations based on the tourist season and indicate if online ticket booking is required. Include information about any danger zones or identification requirements as true or false.
        each description of the place should be at least 70 words long. The description should include the name of the place, a brief description of the place, and a list of tags that describe the place.

        Adventurous places are the places where person has to actively participate in the activity. For example, hiking, skating, boating, tournaments, diving, climbing, driving,bungee jump, etc but not limited to that only.  

        Leisure places are the places where person do not have to be super active. For example, beach, spa, bars, sunbath, golf, skiing, sailing, gardens, lakes etc but not limited to that only. 

        Exploration places are the places where person has to go and learn something. For example, visiting places, halls, meuseum, Walking, discoveries, guided tours but not limited to that only. 

        Enjoyment places are the places where person has to be modereately active. For example, Shoppping, hotels, luxury places, visiting events, attending some seminars, Dining, roam around, gardens, rafting etc but not limited to that only. 

        give me 200 words of description for ${itinerary.destination} and place it in the 'description of the destination'. The includings are the things which will be needed for the trip or needed to make the trip fun. Includings change over the places and you need to find the right balance between too many and too less includings. typically 4 to 5 things needed to make the trip fun. use common sayings in the description of the place to make it more interesting whereever possible.
        
        Note: dates are in dd/mm/yyyy format.

        Structure the response as follows:`

    }

    responseFormat() {
        return `
        {
            "trip_details": {
                                "id": "id of the trip",
                                "destination": "destination",
                                "start_date": "start date",
                                "end_date": "end date",
                                "description": "description of the destination",
                                "includings": ["list of includings"],
                                "itinerary": [
                                                {
                                                    "day": "Day 1",
                                                    "date": "start date",
                                                    "name": " Name of the Day",
                                                    "highlights": "Highlights of the Day in 10 words",
                                                    "places": 
                                                    [
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
                                                        "danger_zone": "Danger zone for Place 3, if any, otherwise null"
                                                        }
                                                    ]
                                                }
                                            ]
                                
                            }
            
        }  
                           
    `;
    }

    buildPrompt() {
        // console.log(`itenaray.js => prompt : ${this.buildInstructions()}+${this.responseFormat()}`);
        return `${this.buildInstructions()}+${this.responseFormat()}`;
    }

    generateItinerary() {
        return new Promise((resolve, reject) => {
            openai.completions.create({
                //messages: [{ role: "system", content: this.buildPrompt()}],
                prompt: this.buildPrompt(),
                model: requestPayload.model,
                temperature: requestPayload.temperature,
                max_tokens: requestPayload.max_tokens,
                top_p: requestPayload.top_p,
                frequency_penalty: requestPayload.frequency_penalty,
                presence_penalty: requestPayload.presence_penalty,
            })
                .then((response) => {
                    
                    let returnResponse = JSON.parse(response.choices[0].text);
                    returnResponse.trip_details.id = response.id;
                    console.log(`itenaray.js => AddedTripId : ${JSON.stringify(returnResponse.trip_details.id)}`);
                    resolve(JSON.stringify(returnResponse));
                    console.log(`response generated `);
                    console.log(`itenaray.js => itineraryModel.uid : ${itinerary.uid}`);

                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}


module.exports = Iternarary;

const axios = require('axios');
const e = require('express');


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



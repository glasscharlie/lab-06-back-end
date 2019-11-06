'use strict';
// npm packages
require('dotenv').config();
const express = require('express');
const cors = require('cors');

//application constant
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

app.get('/location', locationHandler);
app.get('/weather', weatherHandler);
app.use('*', notFoundHandler);
app.use(errorHandler);

function locationHandler (request, response) {
  const geoData = require('./data/geo.json');
  const locationData = new Location('seattle', geoData);
  response.status(200).json(locationData);
}

function Location(city, geoData) {
  this.search_query = city;
  this.formatted_query = geoData.results[0].formatted_address;
  this.latitude = geoData.results[0].geometry.location.lat;
  this.longitude = geoData.results[0].geometry.location.lng;

}

function weatherHandler(request, response) {
  const weatherData = require('./data/darksky.json');
  const weatherSummaries = [];
  weatherData.daily.data.forEach( (day) => {
    weatherSummaries.push( new Weather(day) );
  });
  response.status(200).json(weatherSummaries);
}

function Weather(day){
  this.forcast = day.summary;
  this.time = new Date( day.time * 1000).toString().slice(0,15);
}


function notFoundHandler(request, response) {
  response.status(404).send('not found');
}

function errorHandler(error, request, response) {
  response.status(500).send(error);
}


app.listen(PORT, () =>{
  console.log(`listening to PORT ${PORT}`);
});

'use strict';
// npm packages
require('dotenv').config();
const express = require('express');
const cors = require('cors');

//application constant
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/cool', (req, res) => {
  res.send('cool data from the /cool route');
});

app.get('/location', (req, res) => {
  //send users location back to them
  const geoData = require('./data/geo.json');
  const city = req.query.data;
  const locationData = new Location(city, geoData);
  res.send(locationData);
});

function Location(city, geoData) {
  this.search_query = city;
  this.formatted_query = geoData.results[0].formatted_address;
  this.latitude = geoData.results[0].geometry.location.lat;
  this.longitude = geoData.results[0].geometry.location.lng;

}

app.listen(PORT, () =>{
  console.log(`listening to PORT ${PORT}`);
});

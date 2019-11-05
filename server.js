'use strict';
// npm packages
require('dotenv').config();
const express = require('express');
const cors = require('cors');

//application constant
const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>{
  console.log(`listening to PORT ${PORT}`);
});

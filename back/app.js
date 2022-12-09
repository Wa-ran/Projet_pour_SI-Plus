const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var cors = require('cors');
const controller = require("./controller");

// CORS
app.use(cors());

app.use(bodyParser.json()); // Parser pour exploiter les données plus facilement

app.use(controller);

module.exports = app;
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const path = require('path');
const controller = require("./controller");
const multer = require('multer')

app.use(cors());

app.use(bodyParser.json()); // Parser pour exploiter les données plus facilement

app.use('/images', express.static(path.join(__dirname, '/images')));

app.use(multer({ // Use of multer only to store files in memory, they'll be handle after in routes (accessible with req.files)
  storage: multer.memoryStorage(),
  limits: {
    fieldSize: 2097152 // 2BM max
  }
}).any())

app.use(controller);

module.exports = app;
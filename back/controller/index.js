const express = require('express');
const router = express.Router();

module.exports = router.use('/:route/(:function)?/(:data)?', async (req, res, next) => {
  try {
    let data = {}; // "data" is the object in which we store and update all the needed infos until completion of the request

    if (req.params?.data) data = JSON.parse(req.params.data) // In GET request, "data" is stored in the URL (req.params.data) and need to be parsed
    else try { // In case where formData is received, we need to parse each non-file objects (they're send as Strings), excluding files
      for ([key, value] of Object.entries(req.body)) {
        if (key !== "image") data[key] = JSON.parse(value);
      }
    } catch (error) { // When simple JSON is received
      data = req.body
    }

    // We'll work with models created from the objects stored in "data"
    // TODO : At the creation, sanitization can be performed
    try {
      for (let [objName, objBody] of Object.entries(data)) {
        const model = require(`../models/${objName}`);
        data[objName] = new model(objBody);
      }
    } catch (error) {
      throw { cust: "Wrong data." }
    }

    // Get the correct module, each named according to the route they handle
    const route = require(`../routes/${req.params.route}`);

    // Call the correct module's function, which is in fact an object containing methods named according to the HTTP method :
    // Pattern : In route.js -> exports.function : { METHOD(data) }
    await route[req.params.function][req.method](data, req)
    .then((response) => {
      if (response) res.send(response.beforeSend?.() ?? response)
      else res.sendStatus(200) // If nothing to return, send OK
    })
    .catch((error) => {
      console.log(data)
      throw error
    })
  } catch (error) {
    console.log(error);
    res.status(400).json(error.cust || "Error.")
  }
})
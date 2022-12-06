const express = require('express');
const router = express.Router();

module.exports = router.use('/:route/:function/:data', async (req, res, next) => {

  // data is the object in which we store and update all the needed infos until completion of the request, see below the expected keys/values, or in the API documentation
  const data = JSON.parse(req.params.data) || req.body;

  // Get the correct module
  const route = require(`../routes/${req.params.route}`);

  // Call the correct function 
  await route[`${req.params.function}${req.method}`](data)
  .then((response) => {
    if (response) res.send(response)
    else res.sendStatus(200) // If nothing to return, send OK
  })
  .catch((error) => {
    console.log(data)
    console.log(error);
    res.status(500).json(error) // Be sure to send custom Error
  })
})

// data : {
//   user : {
//     name: String,
//     password: String
//   }
// }
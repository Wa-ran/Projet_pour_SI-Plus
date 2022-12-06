const { MongoClient } = require('mongodb');
const MDBpw = "strongpw"; // Password to Cluster0
const client = new MongoClient(`mongodb+srv://back:${MDBpw}@cluster0.cmbqhhw.mongodb.net/?retryWrites=true&w=majority`);

module.exports = async (collection, method, object) => {
  // Perform a unique request toward database, return the data then close
  // collection (string) - indicate the collection
  // method (string) - method to perform on collection
  // object (object) - args of method

  const database = client.db('SI-Plus');
  collection = database.collection(collection);

  return collection[method](object)
  .catch(err => {
    console.log(...args);
    console.log(err);

    throw "Error with MongoDB"
  })
  .finally(() => client.close())
}
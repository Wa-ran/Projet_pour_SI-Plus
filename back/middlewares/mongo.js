const { MongoClient } = require('mongodb');
const MDBpw = "strongpw"; // Password to Cluster0
const MDBuser = "SI-Plus";

module.exports = async (collection, method, query = {}, options = {}) => {
// Perform a unique request toward database, return the data
// collection (String) - indicate the collection
// method (String) - method to perform on collection
// query (Object) - query arg for method
// options (Object) - options arg for method

  const client = new MongoClient(`mongodb+srv://back:${MDBpw}@cluster0.cmbqhhw.mongodb.net/?retryWrites=true&w=majority`);
  const database = client.db(MDBuser);
  collection = database.collection(collection);

  try { // Try catch instead of then().catch() because not all methods are Promise based
    let res = [];
    const MDBdata = await collection[method](query, {projection: { _id: 0 /* Exclude _id dy default */ }, ...options});

    try { // If MDB return a Cursor, parse it into an Array, otherwise return the value
      await MDBdata.forEach(elem => res.push(elem));
    } catch (error) {
      res = MDBdata
    }

    return res
  } catch (error) {
    console.log(`${collection}[${method}](${query}, ${{projection: { _id: 0 }, ...options}}`);
    console.log(error);
    throw { cust: "Error with MongoDB." }
  }
}
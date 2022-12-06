const { MongoUnexpectedServerResponseError } = require("mongodb");
const mongo = require("../middlewares/mongo");

exports.loginGET = async (data) => {
  // Simple password verification

  const mongoUser = await mongo("users", "findOne", { name: data.user.name });
  if (data.user.password === mongoUser.password) return
  else throw 'Wrong password !'
}
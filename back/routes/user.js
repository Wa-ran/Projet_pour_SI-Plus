const mongo = require("../middlewares/mongo");

exports.login = {
  POST: async (data) => {
  // Simple password verification, throw if invalid, return undefined
  // data: {
  //   user: {
  //     pseudo: (String)
  //     password: (String)
  //   }
  // }

    const mongoUser = await mongo("users", "findOne", { pseudo: data.user.pseudo });

    if (!mongoUser) throw { cust: "This user doesn't exist..." }
    if (data.user.password !== mongoUser.password) throw { cust: "Wrong password !" }
  }
}
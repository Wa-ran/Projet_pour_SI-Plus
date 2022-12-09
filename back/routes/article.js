const mongo = require("../middlewares/mongo");

exports.one = {
  POST: async (data) => {
  // Insert an article
    return await mongo("articles", "insertOne", data.article);
  }
}

exports.multiple = {
  GET: async (data) => {
  // Get next 5 articles

    // Between 1 and 5 articles
    let limit = data.filter.limit || 1;
    if (limit > 5) limit = 5;

    const query = { creationDate: { $lt: data.filter.date || Date.now() } }; // Request by date (by default the most recent)
    const options = {
      limit,
      sort: { date: 1 }, // Sort returned articles in ascending order by date
    };

    return await mongo("articles", "find", query, options);
  }
}
const mongo = require("../middlewares/mongo");

exports.one = {
  GET: async (data) => {
  // Get an article
  // data: {
  //   article: {
  //     date: (Number) - milliseconds since epoch
  //   }
  // }
  const query = {
    creationDate: { $lte: data.article.creationDate }, // Corresponding to the date or before
  };
  console.log(query)
  const options = {
    sort: { $natural: -1 }, // Search by the end to get the most recent
    projection: { _id: 0 }, // Exclude _id
  };
    return await mongo("articles", "findOne", query, options);
  },
  POST: async (data) => {
  // Insert an article
  // data: {
  //   article: {
  //     pseudo: (String)
  //     password: (String)
  //   }
  // }
    data.article.creationDate = Date.now(); // Prevent user to manipulate the creation order
    await mongo("articles", "insertOne", data.article);
  },
  PUT: async (data) => {
  // Insert an article
  // data: {
  //   article: {
  //     pseudo: (String)
  //     password: (String)
  //   }
  // }
    data.article.lastUpdateDate = Date.now();
    await mongo("articles", "replaceOne", { creationDate: data.article.creationDate }, data.article);
  },
  DELETE: async (data) => {
  // Remove an article
  // data: {
  //   article: {
  //     creationDate: (Number) - milliseconds since epoch
  //   }
  // }
    await mongo("articles", "deleteOne", { creationDate: data.article.creationDate });
  }
}

exports.multiple = {
  GET: async (data) => {
  // Get next 5 articles
  // data: {
  //   filter: {
  //     limit: (Number) (optional)
  //     date: (Number) (optional) - milliseconds since epoch
  //   }
  // }

    // Between 1 and 5 articles
    let limit = data.filter.limit || 1;
    if (limit > 5) limit = 5;

    const query = { creationDate: { $lt: data.filter.date || Date.now() } }; // Request by date (by default the most recent)
    const options = {
      limit,
      sort: { $natural: -1 }, // Sort returned articles in descending order by date (the most recent first)
      projection: { _id: 0 }, // Exclude _id
    };

    return await mongo("articles", "find", query, options);
  }
}
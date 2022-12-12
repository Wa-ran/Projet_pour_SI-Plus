const mongo = require("../middlewares/mongo");
const multer = require("../middlewares/multer");
const fs = require('fs');

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

    // Only one image saved with creationDate as name
    if (req.files[0]) fs.writeFile(`./images/${data.article.creationDate}.webp`, req.files[0].buffer, function(err) {
      if(err) {
          throw { cust: "File not saved." }
      }
    });
    await mongo("articles", "insertOne", data.article);
  },
  PUT: async (data, req) => {
  // Insert an article
  // data: {
  //   article: {
  //     pseudo: (String)
  //     password: (String)
  //   }
  // }

    // Only one image modified with creationDate as name
    if (req.files[0]) fs.writeFile(`./images/${data.article.creationDate}.webp`, req.files[0].buffer, function(err) {
      if(err) {
          throw { cust: "File not saved." }
      }
    });
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
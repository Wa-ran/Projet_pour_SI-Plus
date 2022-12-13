const mongo = require("../middlewares/mongo");
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
  POST: async (data, req) => {
  // Insert an article
  // data: {
  //   article: {
  //     title: (String)
  //     content: (String)
  //   }
  // }

    data.article.creationDate = Date.now(); // Prevent user to manipulate the creation order

    await mongo("articles", "insertOne", data.article)
    .then(() => {
      // Only one image saved with creationDate as name
      if (req.files[0]) fs.writeFile(`./images/${data.article.creationDate}.webp`, req.files[0].buffer, function(err) {
        if (err) {
          throw { cust: "File not saved." }
        }
      });
    })
  },
  PUT: async (data, req) => {
  // Insert an article
  // data: {
  //   article: {
  //     title: (String)
  //     content: (String)
  //     creationDate: (Number) - milliseconds since epoch
  //   }
  // }
    data.article.lastUpdateDate = Date.now();
    await mongo("articles", "replaceOne", { creationDate: data.article.creationDate }, data.article)
    .then(() => {
      // Only one image modified with creationDate as name
      if (req.files[0]) fs.writeFile(`./images/${data.article.creationDate}.webp`, req.files[0].buffer, function(err) {
        if(err) {
          throw { cust: "File not saved." }
        }
      });
    })
  },
  DELETE: async (data) => {
  // Remove an article
  // data: {
  //   article: {
  //     creationDate: (Number) - milliseconds since epoch
  //   }
  // }
    await mongo("articles", "deleteOne", { creationDate: data.article.creationDate })
    .then(() => {
      try {
        fs.unlinkSync(`./images/${data.article.creationDate}.webp`)
      } catch (error) {
        // throw { cust: "Article deleted but image not found" }
        return
      }
    })
    .catch((error) => {
      console.log(error);
      throw { cust: "Article not found" }
    })
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

exports.image = {
  DELETE: async (data, req) => {
  // Delete an image
  // data: {
  //   article: {
  //     creationDate: (Number) - milliseconds since epoch
  //   }
  // }

    try {
      fs.unlinkSync(`./images/${data.article.creationDate}.webp`)
    } catch (error) {
      throw { cust: "Image not found" }
    }
  },
}
module.exports = class Article {

  constructor(data) {
    // data: {
    //   title: (String)
    //   content: (String)
    //   creationDate: (Number) - millisecond since epoch
    //   lastUpdateDate: (Number) - millisecond since epoch
    // }
    this.title = data.title;
    this.content = data.content;
    this.lastUpdateDate = data.creationDate ? Date.now() : data.lastUpdateDate; // If already created, this is an update
    this.creationDate = data.creationDate || Date.now();
  };
};

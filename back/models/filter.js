module.exports = class Filter {

  constructor(data) {
    // data: {
    //   date: (Number) - millisecond since epoch
    //   number: (Number)
    // }
    this.date = data.date;
    this.limit = data.limit;
  };
};

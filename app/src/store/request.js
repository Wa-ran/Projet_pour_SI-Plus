const axios = require('axios');
const requestConfig = {
  baseURL: 'http://localhost:3000/',
};

export default {
  async request(context, payload) {

    // payload is mean to override axios config, the keys must corresponds to axios config options
    // API is like : URL/:route/:function/:data
    payload.baseURL = `
    ${requestConfig.baseURL}${payload.route}/${payload.function}/`;

    // GET (default if omitted) = data are send with the URL
    if (["GET", undefined].indexOf(payload?.method?.toUpperCase()) > -1) {
      payload.baseURL += encodeURIComponent(JSON.stringify(payload.data));
    }

    return axios.create({ ...requestConfig, ...payload })()
    .then((res) => res.data)      
    .catch((error = error.response) => {

      // If no error.response, it mean there is no network
      if (!error) error = {
        "config": {
          "url": payload.url
        },
        "status": 500,
      };

      console.log(error);
    })
  },
}
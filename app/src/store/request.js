const axios = require('axios');

import constants from '@/constants';
const requestConfig = {
  baseURL: constants.serverURL,
};

export default {
  async request(context, payload) {
  // payload is mean to override axios config, the keys must corresponds to axios config options

    // API is like : URL/:route/:function/:data
    payload.baseURL = `
    ${requestConfig.baseURL}${payload.route}/${payload.function}/`;

    // If GET request (by default if omitted), data are sent with the URL
    if (payload.data && ["GET", undefined].indexOf(payload?.method?.toUpperCase()) > -1) {
      payload.baseURL += encodeURIComponent(JSON.stringify(payload.data));
    }

    return axios.create(requestConfig).request(payload)
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
      throw error
    })
  },
}
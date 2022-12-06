import { createStore } from 'vuex'

const axios = require('axios');
const requestConfig = axios.create({
  baseURL: 'http://localhost:3000/',
});

export default createStore({
  state: {
    // State
  },
  mutations: {
    mutateState(state, payload) {
      state[payload.key] = payload.value;
    }
  },
  actions: {
    async request(context, payload = null) {
      return requestConfig(payload)
      .then((res) => res.data)      
      .catch((error = error.response) => {
        if (!error) error = {
          "config": {
            "url": payload.url
          },
          "status": 500,
        };
        console.log(error);
      })
    },
  },
  getters: {
  },
  modules: {
  }
})

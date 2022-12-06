import { createStore } from 'vuex'
import request from "./request"

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
    async login(context, payload) {
      // payload = { 
      //   name: String,
      //   password: String
      // }

      return context.dispatch("request", {
        route: "user",
        function: "login",
        data: { user: payload },
      })
    },
    ...request
  },
  getters: {
  },
  modules: {
  }
})

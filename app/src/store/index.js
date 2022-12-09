import { createStore } from 'vuex'
import request from "./request"

export default createStore({
  state: {
    connected: false,
    articlesList: [],
    user: null,
  },
  mutations: {
    mutateStateKey(state, payload) {
    // Override a value
    // payload: { 
    //   key (String) - corresponding to state
    //   value (Any) - the value to assign
    // }
      state[payload.key] = payload.value;
    },
    addArticles(state, payload) {
    // Add multiple articles
    // payload: { 
    //   value: (Array) - articles to add to articlesList
    // }
    state.articlesList = state.articlesList.concat(payload.value)
    }
  },
  actions: {
    async login(context, payload) {
    // Return nothing, throw if login failed
    // payload: { 
    //   pseudo: (String) - the user pseudo
    //   password: (String) - the user password
    // }
      await context.dispatch("request", {
        method: "POST",
        route: "user",
        function: "login",
        data: {
          user: payload
        },
      })
      .then(context.commit("mutateStateKey", {
        key: "connected",
        value: true
      }))
    },
    async getMultipleArticles(context) {
    // Return an Array of articles
      await context.dispatch("request", {
        route: "article",
        function: "multiple",
        data: {
          filter: {
            date: null,
            limit: 5,
          }
        }
      })
      .then(res => {
        context.commit("addArticles", {value: res})
      })
    },
    async postArticle(context, payload) {
    // Create an article and return it, throw if creation fail
    // payload: { 
    //   title: (String)
    //   content: (String)
    // }
      await context.dispatch("request", {
        method: "POST",
        route: "article",
        function: "one",
        data: {
          article: payload
        },
      })
      .then(res => {
        context.commit("addArticles", {value: res})
      })
    },
    ...request
  },
  getters: {
  },
  modules: {
  }
})

import { createStore } from 'vuex'
import request from "./request"

export default createStore({
  state: {
    connected: false, // Indicate if the user is connected
    articlesList: [], // An array containing the articles
    user: null, // Datas concerning user

    // Keys below are dedicates to "transfers" (via watch) between components (instead of using child/parent/child event/props)
    // Pattern : ComponentName_Key
    ArticlesForm_Update: null,
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
    // Add articles
    // payload: { 
    //   value: (Any - Array) - articles to add to articlesList
    // }

      // Using concatenation then sort the list by creationDate
      state.articlesList = state.articlesList.concat(payload.value).sort((a, b) => a.creationDate > b.creationDate ? -1 : 1)
    },
    modifyArticle(state, payload) {
      // Modify an article
      // payload: { 
      //   value: (article object) - article to modify in articlesList
      // }

        // Using concatenation then sort the list by creationDate
        let index = state.articlesList.findIndex(article => article.creationDate === payload.value.creationDate);
        if (index > -1) state.articlesList.splice(index, 1, payload.value)
      },
    deleteArticles(state, payload) {
    // Delete articles
    // payload: { 
    //   value: (Array) - articles to delete from articlesList (based on creationDate)
    // }
      state.articlesList = state.articlesList.filter(article => !payload.includes(article.creationDate))
    }
  },
  actions: {
    async login(context, payload) {
    // Return nothing, throw if login failed
    // payload: {
    //   user: {
    //     pseudo: (String) - the user pseudo
    //     password: (String) - the user password
    //   }
    // }
      await context.dispatch("request", {
        method: "POST",
        route: "user",
        function: "login",
        data: {
          user: payload.user
        },
      })
      .then(context.commit("mutateStateKey", {
        key: "connected",
        value: true
      }))
    },
    async getArticle(context, payload) {
    // Get an article by creationDate, or the most recent before the date if not found
    // Get the last created article if not sending data
    // payload: {
    //   article: {
    //     creationDate: (Number) - milliseconds sonce epoch
    //   }
    // }
      return await context.dispatch("request", {
        method: "GET",
        route: "article",
        function: "one",
        data: {
          article: {
            creationDate: payload?.article.creationDate || Date.now()
          }
        },
      })
    },
    async getMultipleArticles(context) {
    // Return an Array of articles
      return await context.dispatch("request", {
        route: "article",
        function: "multiple",
        data: {
          filter: {
            date: this.getters.oldestArticlesCreationDate,
            limit: 5,
          }
        }
      })
    },
    async postArticle(context, payload) {
    // Create an article and return it, throw if creation fail
    // payload: {
    //   article: {
    //     title: (String)
    //     content: (String)
    //   },
    //   image: (file)
    // }
      const formData = new FormData();
      for (let [key, value] of Object.entries(payload)) {
        formData.append(key, key === "image" ? value : JSON.stringify(value));
      }
      return await context.dispatch("request", {
        method: "POST",
        route: "article",
        function: "one",
        data: formData,
      })
      .then(() => context.dispatch("getArticle"))
    },
    async updateArticle(context, payload) {
    // Update an article and return it, throw if update fail
    // payload: {
    //   article: {
    //     title: (String)
    //     content: (String)
    //     creationDate: (Number) - milliseconds sonce epoch
    //   },
    //   image: (file)
    // }
      const formData = new FormData();
      for (let [key, value] of Object.entries(payload)) {
        formData.append(key, key === "image" ? value : JSON.stringify(value));
      }
      return await context.dispatch("request", {
        method: "PUT",
        route: "article",
        function: "one",
        data: formData,
      })
      .then(() => context.dispatch("getArticle", payload))
    },
    async deleteArticle(context, payload) {
    // Create an article and return it, throw if creation fail
    // payload: { 
    //   article: {
    //     creationDate: (Number) - milliseconds sonce epoch
    //   }
    // }
      await context.dispatch("request", {
        method: "DELETE",
        route: "article",
        function: "one",
        data: {
          article: payload.article
        },
      })
      .then(() => context.commit("deleteArticles", [payload.article.creationDate]))
    },
    ...request
  },
  getters: {
    oldestArticlesCreationDate: (state) => {
      return Math.min(...state.articlesList.map(article => article.creationDate))
    }
  },
  modules: {
  }
})

import axios from "axios";
import Vue from "vue";
export default {
  state: {
    posts: [],
    loaded: false
  },
  getters: {},
  mutations: {
    add(state,payload) {
      Vue.set(state.posts, state.posts.length, payload.data)
     // state.posts.$set(state.posts.length, payload.data);
    },
    update(state, payload) {
      state.posts[payload.index] = payload.data;
    },
    remove(state, payload) {
      Vue.delete(state.posts, payload.index);
    }
  },
  actions: {
    getPosts({commit, state, getters, dispatch, rootState}, payload){
    if(state.loaded) {
      return
    }
      axios.get(rootState.baseUrl+"posts", {headers:rootState.headers, params: {offset:9490,limit:10}}).then((response) => {
        for (let post of response.data.data) {
          let result = post.attributes;
          result.id = post.id;
          commit("add", { data:result});
        }

        state.loaded = true;
      }).catch((error) => {
        if (error.response) {
          Vue.$notify(error.response.data.message, "error")
          //console.error(error.response.data.message);
        }
      })
    },
    addPost({ commit, state, getters, dispatch, rootState}, payload){
      return axios.post(rootState.baseUrl + "posts",payload.data, {headers:rootState.headers}).then((response) => {
        let result = response.data.attributes
        result.id = response.data.id
        commit("add",{data: result})
      }).catch((error) => {
        if (error.response) {
          Vue.$notify(error.response.data.message, "error")
        }
      })
    },
    removePost({ commit, state, getters, dispatch, rootState}, payload){
      axios.delete(rootState.baseUrl + "posts/" + payload.data.id, {headers:rootState.headers}).then((response) => {
        commit("remove", payload)
      }).catch((error) => {
        if (error.response) {
          Vue.$notify(error.response.data.message, "error")
        }
      })
    },
    updatePost({ commit, state, getters, dispatch, rootState}, payload){
      axios.put(rootState.baseUrl + "posts/" + payload.data.id,{title:payload.data.title,body:payload.data.body}, {headers:rootState.headers}).then((response) => {
        commit("update", payload)
      }).catch((error) => {
        if (error.response) {
          Vue.$notify(error.response.data.message, "error")
        }
      })
    }
  }
}

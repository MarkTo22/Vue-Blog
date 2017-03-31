import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    login: false
  },
  getters: {
    login: state => {
      return state.login
    }
  },
  mutations: {//同步
    checkLogin: (state, payload) => {
      state.login = payload;
    }
  },
  actions: {//异步
    checkLogin: ({ commit }, payload) => {
      commit('checkLogin', payload);
    }
  }
})
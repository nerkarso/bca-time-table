import Vue from 'vue';
import Vuex from 'vuex';
import data from '../data/table.json';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false,
    class: '',
    date: '',
    dictionary: [],
    weekdays: [],
    time: [],
    days: []
  },
  mutations: {
    SET_LOADING(state, payload) {
      state.isLoading = payload;
    },
    SET_CLASS(state, payload) {
      state.class = payload;
    },
    SET_DATE(state, payload) {
      state.date = payload;
    },
    SET_DICTIONARY(state, payload) {
      state.dictionary = payload;
    },
    SET_WEEKDAYS(state, payload) {
      state.weekdays = payload;
    },
    SET_TIME(state, payload) {
      state.time = payload;
    },
    SET_DAYS(state, payload) {
      state.days = payload;
    }
  },
  actions: {
    /**
     * Fetch table from API
     */
    async fetchTable({ commit }) {
      // Add data to states
      commit('SET_CLASS', data.class);
      commit('SET_DATE', data.date);
      commit('SET_DICTIONARY', data.dictionary);
      commit('SET_WEEKDAYS', data.weekdays);
      commit('SET_TIME', data.time);
      commit('SET_DAYS', data.days);
    }
  },
  getters: {
    isLoading(state) {
      return state.isLoading;
    },
    class(state) {
      return state.class;
    },
    date(state) {
      return state.date;
    },
    dictionary(state) {
      return state.dictionary;
    },
    weekdays(state) {
      return state.weekdays;
    },
    time(state) {
      return state.time;
    },
    days(state) {
      return state.days;
    }
  }
});

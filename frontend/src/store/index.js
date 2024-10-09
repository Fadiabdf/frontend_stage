// store/index.js
import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    selectedCriteria: [],
    etiquettes: [],
    mots: [],
    languages: [],  

  },
  mutations: {
    setCriteria(state, criteria) {
      state.selectedCriteria = criteria;
    },
    SET_ETIQUETTES(state, etiquettes) {
      state.etiquettes = etiquettes;
    },
    SET_MOTS(state, mots) {
      state.mots = mots;
    },
    SET_LANGUAGES(state, languages) { 
      state.languages = languages;
    },

  },
  actions: {
    updateCriteria({ commit }, criteria) {
      commit('setCriteria', criteria);
    },
    async fetchEtiquettes({ commit }) {
      try {
        const response = await axios.get('http://127.0.0.1:8000/validation/etiquettes/');
        commit('SET_ETIQUETTES', response.data);
      } catch (error) {
        console.error('Error fetching etiquettes:', error.response ? error.response.data : error.message);
      }
    },
    async fetchMots({ commit }) {
      try {
        const response = await axios.get('http://127.0.0.1:8000/validation/mots/');
        commit('SET_MOTS', response.data);
      } catch (error) {
        console.error('Error fetching mots:', error.response ? error.response.data : error.message);
      }
    },
    async fetchLanguages({ commit }) { 
      try {
        const response = await axios.get('http://127.0.0.1:8000/validation/languages/');
        commit('SET_LANGUAGES', response.data);
      } catch (error) {
        console.error('Error fetching languages:', error.response ? error.response.data : error.message);
      }
    },
  },
  getters: {
    getCriteria: (state) => state.selectedCriteria,
    getEtiquettes: (state) => state.etiquettes,
    getMots: (state) => state.mots,
    getLanguages: (state) => state.languages, 

  }
});

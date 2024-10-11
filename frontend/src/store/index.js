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
        const apiUrl = process.env.VUE_APP_API_URL;
        const response = await axios.get(`${apiUrl}/validation/etiquettes/`);
        commit('SET_ETIQUETTES', response.data);
      } catch (error) {
        console.error('Error fetching etiquettes:', error.response ? error.response.data : error.message);
      }
    },
    async fetchMots({ commit }) {
      try {
        const apiUrl = process.env.VUE_APP_API_URL;
        const response = await axios.get(`${apiUrl}validation/mots/`);
        commit('SET_MOTS', response.data);
      } catch (error) {
        console.error('Error fetching mots:', error.response ? error.response.data : error.message);
      }
    },
    async fetchLanguages({ commit }) { 
      try {
        const apiUrl = process.env.VUE_APP_API_URL;
        const response = await axios.get(`${apiUrl}/validation/languages/`);
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

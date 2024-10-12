<template>
  <AppNavbar />
  <div class="flex pt-5 items-center justify-center z-10 text-white-clr">
        <div class="flex justify-center items-center w-11 h-11 bg-blue-clr rounded-full mr-3">
          <img src="../assets/icons/resultats.png" alt="Header icon" class="w-8 h-8" />
        </div>
        <p class="text-2xl ml-0 font-OPTIAuvantGothic-Bold text-blue-clr t-shadow2">
          Calcul des frequences et pourcentages des types de conflit
        </p>
      </div>
  <div class="parent-container">
    <h1 class="font-bold">Selectionnez des types de conflit</h1>
    <p class="mt-2"><em>Vous pouvez sélectionner plusieurs types à la fois </em></p>
    
    <div class="flex justify-center items-center mt-4 mb-[50px] space-x-4">
      <div class="relative inline-block text-left">
        <button @click="toggleDropdown" type="button"
          class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Types de conflit
          <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
            aria-hidden="true">
            <path fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd" />
          </svg>
        </button>
        <div v-if="isOpen"
          class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 max-h-60 overflow-y-auto">
          <div class="py-1">
            <label v-for="option in options" :key="option.value"
              class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
              <input type="checkbox" :value="option.value" v-model="currentSelection" class="mr-2">
              {{ option.label }}
            </label>
          </div>
        </div>
      </div>
      <button @click="confirmSelection" class="px-4 py-2 bg-blue-clr text-white rounded-md">Ajouter</button>
      <button :disabled="loading" @click="calculateResults" class="px-4 py-2 bg-green-500 text-white rounded-md">Calculer</button>

      
    </div>
    <div class="selection-container mt-4" v-if="selectedCombinations.length > 0">
    <div class="selected-types shadow-lg border border-gray-300">
      <div class="flex flex-wrap">
        <span v-for="(combination, index) in selectedCombinations" :key="index" class="combination-item">
          {{ formatCombination(combination) }}
          <button @click="removeCombination(index)" class="ml-2 text-blue-500 font-bold">x</button>
        </span>
      </div>
    </div>
  </div>
    <div v-if="frequencies.length > 0" class="results-container">
      <h2 class="font-bold">Résultats</h2>
      <div class="results">
        <div v-for="(frequency, index) in frequencies" :key="index" class="result-item">
          <strong>{{ formatCombination(selectedCombinations[index]) }}:</strong> {{ frequency }}
        </div>
      </div>
    </div>
    <div v-if="loading" class="mt-5 text-black-200 font-bold">
          <em>Chargement en cours, veuillez patienter...</em>
    </div>
  </div>
</template>

<script>
import AppNavbar from '@/components/AppNavbar.vue';
import { mapState, mapActions } from 'vuex';
import axios from 'axios';

export default {
  components: {
    AppNavbar
  },
  data() {
    return {
      title: 'Sélection de Types de Conflits',
      isOpen: false,
      currentSelection: [],
      selectedCombinations: [],
      frequencies: [],
      percentages: [], 
      total_desc : 0,
      loading: false
    };
  },
  computed: {
    ...mapState({
      options: state => state.etiquettes.map(etiquette => ({ label: etiquette, value: etiquette }))
    })
  },
  methods: {
    ...mapActions(['fetchEtiquettes']),
    async calculateResults() {
      this.loading = true;
      try {
        if (this.selectedCombinations.length > 0) {
          const apiUrl = "http://localhost:8080";
          const response = await axios.post(`${apiUrl}/validation/process-combinations/`, {
            selectedCombinations: this.selectedCombinations
          });

          this.frequencies = Array.isArray(response.data.frequencies) ? response.data.frequencies : [];
          this.percentages = Array.isArray(response.data.percentages) ? response.data.percentages : [];
          this.total_desc = response.data.total ;

          this.$router.push({
            name: 'PageTableau',
            query: { 
              selectedCombinations: JSON.stringify(this.selectedCombinations),
              frequencies: JSON.stringify(this.frequencies),
              percentages: JSON.stringify(this.percentages),
              total : this.total_desc
            }
          });
        } else {
          console.log('No combinations selected, sending empty data to backend');
          this.$router.push({
            name: 'PageTableau',
            query: { 
              selectedCombinations: JSON.stringify(this.selectedCombinations),
              frequencies: JSON.stringify(this.frequencies),
              percentages: JSON.stringify(this.percentages),
            }
          });
        }
      } catch (error) {
        console.error('Error sending data to backend:', error);
        this.$router.push({
          name: 'PageTableau',
          query: { 
            selectedCombinations: JSON.stringify(this.selectedCombinations),
            frequencies: JSON.stringify(this.frequencies),
            percentages: JSON.stringify(this.percentages),
          }
        });
      }
    },
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    confirmSelection() {
      if (this.currentSelection.length > 1) {
        const combination = { types: [...this.currentSelection] };
        this.selectedCombinations.push(combination);
      } else {
        this.currentSelection.forEach(type => {
          this.selectedCombinations.push({ types: [type] });
        });
      }
      this.currentSelection = [];
      this.isOpen = false;
    },
    formatCombination(combination) {
      return combination.types.join('+');
    },
    removeCombination(index) {
      this.selectedCombinations.splice(index, 1);
    },
  },
  created() {
    this.fetchEtiquettes();  
  }
}
</script>

<style scoped>
.flex.pt-5.items-center.justify-center.z-10.text-white-clr {
  margin-top: 1rem; 
}
.parent-container {
  text-align: center;
  margin-top: 80px;
}

.flex {
  display: flex;
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.space-x-4 {
  margin-left: 1rem;
}

.relative {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  right: 0;
  margin-top: 0.5rem;
}

.selection-container {
  display: flex;
  justify-content: center;
}

.selected-types {
  margin-top: 30px;
  max-width: 400px;
  width: 100%;
  padding: 10px;
  border-radius: 15px;
  background-color: #fff;
  margin: 0 auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid #d1d5db;
}

.selected-types p {
  margin: 0;
  font-weight: bold;
}

.selected-types .flex {
  display: flex;
  flex-wrap: wrap;
}

.selected-types .combination-item {
  margin-right: 10px;
  background-color: #80d4ff;
  color: #1e40af;
  font-weight: 500;
  padding: 5px 15px;
  border-radius: 15px;
  margin-bottom: 10px;
  border: 2px solid #1e40af;

}

.results-container {
  margin-top: 30px;
}

.results {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.result-item {
  font-size: 16px;
  margin-bottom: 10px;
}

.inline {
  display: inline;
}
</style>

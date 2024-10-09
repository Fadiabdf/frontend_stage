<template>
  <AppNavbar />
  <div class="flex pt-5 items-center justify-center z-10 text-white-clr">
    <div class="flex justify-center items-center w-11 h-11 bg-blue-clr rounded-full mr-3">
      <img src="../assets/icons/dividendes.png" alt="Header icon" class="w-9 h-9" />
    </div>
    <p class="text-2xl ml-0 font-OPTIAuvantGothic-Bold text-blue-clr t-shadow2">
      Fréquences et pourcentages des types de conflit
    </p>
  </div>
  <div class="table-container">
    <!-- Remonter et agrandir le texte "Résultats des Sélections" -->
    <h1 class="font-bold mb-4 title">Résultats des Sélections</h1>
    <table class="min-w-full table-auto">
      <thead>
        <tr>
          <th class="px-4 py-2 bg-header border-header border-2 text-white font-semibold rounded-tl-lg">Type</th>
          <th class="px-4 py-2 bg-header border-header border-2 text-white font-semibold">Fréquence</th>
          <th class="px-4 py-2 bg-header border-header border-2 text-white font-semibold rounded-tr-lg">Pourcentage</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in localSelectedCombinations" :key="'row-' + index">
          <td class="px-4 py-2 bg-cell border-header border-2 text-white font-semibold">{{ formatCombination(item) }}</td>
          <td class="px-4 py-2 bg-cell border-header border-2 text-white font-semibold">{{ formatFrequence(localFrequencies[index]) }}</td>
          <td class="px-4 py-2 bg-cell border-header border-2 text-white font-semibold">{{ formatPercentage(localPercentages[index]) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AppNavbar from '@/components/AppNavbar.vue';

export default {
  components: { AppNavbar },
  data() {
    return {
      localSelectedCombinations: [],
      localFrequencies: [],
      localPercentages: [],
      total : 0,
    };
  },
  methods: {
    formatCombination(combination) {
      return combination.types.join('+');
    },
    formatPercentage(percentage) {
      return percentage.toFixed(2) + '%'; 
    },
    formatFrequence(frequence){
      return frequence + ' / ' + this.total ;
    }
  },
  mounted() {
  const query = this.$route.query;
  this.localSelectedCombinations = JSON.parse(query.selectedCombinations || '[]');
  this.localFrequencies = JSON.parse(query.frequencies || '[]');
  this.localPercentages = JSON.parse(query.percentages || '[]');
  this.total = query.total;
  const combinedData = this.localSelectedCombinations.map((combination, index) => ({
    combination: combination,
    frequency: this.localFrequencies[index],
    percentage: this.localPercentages[index]
  }));
  combinedData.sort((a, b) => b.frequency - a.frequency);
  this.localSelectedCombinations = combinedData.map(item => item.combination);
  this.localFrequencies = combinedData.map(item => item.frequency);
  this.localPercentages = combinedData.map(item => item.percentage);
}

}
</script>

<style scoped>
.table-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 70px;
  text-align: center;
}

.title {
  margin-top: -20px; 
  font-size: 1.5rem;
}

table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  border: 2px solid #ffffff;
  text-align: center;
  padding: 8px;
  border-radius: 8px;
}

.bg-header {
  background-color:#008DDA; 
}

.bg-cell {
  background-color: #0E46A3; 
}

.border-header {
  border-color: #EAE4DD;
}

.text-white {
  color: #ffffff;
}

.font-semibold {
  font-weight: 600;
}
</style>

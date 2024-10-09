<template>
  <div class="parent-container">
    <AppNavbar />
    <div class="flex pt-5 items-center justify-center z-10 text-white-clr">
        <p class="text-3xl ml-0 font-OPTIAuvantGothic-Bold text-blue-clr t-shadow2">
          Frequences des langues
        </p>
      </div>

    <div class="chart-section">
      <LanguageChart :msg="chartMessage" :frequences="frequences" :labels="labels" />
    </div>

    <div class="flex pt-5 items-center justify-center z-10 text-white-clr">
        <p class="text-3xl ml-0 font-OPTIAuvantGothic-Bold text-blue-clr t-shadow2">
          Pourcentages des langues
        </p>
      </div>

    <div class="graph-container">
      <Khi2Chart msg="" :frequences="frequences" :labels="labels"/>
    </div>
  </div>
</template>

<script>
import LanguageChart from '../components/LanguageChart.vue';
import AppNavbar from '../components/AppNavbar.vue';
import Khi2Chart from '../components/Graph.vue';

export default {
  name: 'ParentComponent',
  components: {
    LanguageChart,
    AppNavbar,
    Khi2Chart
  },
  data() {
    return {
      title: 'Analyse des Fréquences des Langues',
      chartMessage: 'Fréquences des Langues et Combinaisons',
      frequences: [], 
      labels: [] 
    };
  },
  mounted() {
    try {
      const frequences = JSON.parse(this.$route.query.frequences || '[]');
      const labels = JSON.parse(this.$route.query.labels || '[]');
      this.frequences = frequences;
      this.labels = labels;
    } catch (e) {
      console.error("Error parsing query parameters:", e);
    }
  }
}
</script>


<style scoped>
.parent-container {
  text-align: center;
}

.ellipse1-container {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
}

.ellipse1 {
  margin-top: 20px;
  background-image: url('../assets/icons/Ellipse2.png');
  background-size: cover;
  background-position: center;
  color: white;
  padding: 20px;
  border-radius: 50%;
  width: 60%;
  max-width: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.title {
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  margin: 0;
}

.no-wrap {
  white-space: nowrap;
}

.chart-section {
  display: flex;
  justify-content: center;
}

.graph-container {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}
</style>

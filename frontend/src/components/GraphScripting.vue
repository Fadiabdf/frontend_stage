<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="chart-container">
      <canvas id="scriptChart"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';
import axios from 'axios';

export default {
  name: 'ScriptChart',
  props: {
    msg: String
  },
  data() {
    return {
      labels: ['Latin', 'Abjadia', 'Mixte'],
     
    };
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/validation/freq_scripts/');
        if (Array.isArray(response.data) ) {
          this.frequencies = response.data;
        } else {
          console.error('Unexpected response format:', response.data);
          this.frequencies = [0, 0, 0];
        }
      } catch (error) {
        console.error('Error fetching data from backend:', error);
        this.frequencies = [0, 0, 0];
      } finally {
        this.updateChart();
      }
    },
    updateChart() {
      const ctx = document.getElementById('scriptChart').getContext('2d');
      if (ctx) {
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: this.labels,
            datasets: [{
              label: "Fréquences des scripts",
              data: this.frequencies,
              backgroundColor: [
              '#F0EDCF',
              '#40A2D8',
              '#0B60B0',
              '#8EACCD',
              '#D2E0FB',
              '#8EACCD',
              '#295F98',
              '#405D72'
              ],
              borderColor: [
              '#F0EDCF',
              '#40A2D8',
              '#0B60B0',
              '#8EACCD',
              '#D2E0FB',
              '#8EACCD',
              '#295F98',
              '#405D72'
              ],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>

<style scoped>
.chart-container {
  width: 600px;
  height: 300px;
  position: relative;
}

canvas {
  width: 100% !important;
  height: 100% !important;
}
</style>

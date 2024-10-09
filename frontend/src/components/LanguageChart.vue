<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="chart-container">
      <canvas id="languageChart"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
  name: 'LanguageChart',
  props: {
    msg: String,
    frequences: {
      type: Array,
      default: () => []
    },
    labels: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      chartInstance: null,
      data: {
        labels: [],
        datasets: [{
          label: 'Fréquences des Langues',
          data: [],
          backgroundColor: [
            '#624E88',
            '#CB80AB',
            '#295F98',
            '#86AB89',
            '#A28B55',
            '#C5705D',
            '#55AD9B',
            '#6E5773',
            '#6D2932',
            '#F6F193',
            '#9BB8CD',
            '#BEADFA',
            '#F8EDE3',
            '#5F374B'
         
          ],
          borderColor: [
            '#624E88',
            '#CB80AB',
            '#295F98',
            '#86AB89',
            '#A28B55',
            '#C5705D',
            '#55AD9B',
            '#6E5773',
            '#6D2932',
            '#F6F193',
            '#9BB8CD',
            '#BEADFA',
            '#F8EDE3',
            '#5F374B'

          ],
          borderWidth: 1
        }]
      }
    };
  },
  methods: {
    updateChart() {
      const ctx = document.getElementById('languageChart').getContext('2d');
      if (ctx) {
        if (this.chartInstance) {
          this.chartInstance.destroy();
        }
        this.chartInstance = new Chart(ctx, {
          type: 'bar',
          data: this.data,
          options: {
            responsive: true,
            scales: {
              x: {
                beginAtZero: true,
                title: {
                  display: true,
                }
              },
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                }
              }
            },
            plugins: {
              legend: {
                display: true,
                position: 'top'
              }
            }
          }
        });
      }
    },
    filterData(labels, frequences) {
      const filteredData = frequences
        .map((value, index) => (value > 0 ? { label: labels[index], value } : null))
        .filter(item => item !== null);
      this.data.labels = filteredData.map(item => item.label);
      this.data.datasets[0].data = filteredData.map(item => item.value);


      if (this.data.labels.length > this.data.datasets[0].backgroundColor.length) {
        this.data.datasets[0].backgroundColor = this.data.datasets[0].backgroundColor.concat(
          Array(this.data.labels.length - this.data.datasets[0].backgroundColor.length).fill('rgba(204, 204, 204, 0.5)')
        );
      }
    }
  },
  watch: {
    frequences: {
      immediate: true,
      handler(newFrequences) {
        if (newFrequences.length > 0 && this.labels.length > 0) {
          this.filterData(this.labels, newFrequences);
          this.updateChart(); 
        }
      }
    }
  },
  mounted() {
    this.updateChart();
  }
}
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

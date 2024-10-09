aaaaaaaaaaa<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="chart-legend-container">
      <div class="custom-legend">
        <ul>
          <li v-for="(label, index) in filteredLabels" :key="index">
            <span :style="{ backgroundColor: filteredBackgroundColor[index] }"></span>
            {{ label }}
          </li>
        </ul>
      </div>
      <div class="chart-container">
        <canvas id="myChart"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import { nextTick } from 'vue';
import Chart from 'chart.js/auto';

export default {
  name: 'Khi2Chart',
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
      data: {
        labels: [],
        datasets: [{
          label: 'My Dataset',
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
          hoverOffset: 4
        }]
      },
      chartInstance: null,
      filteredLabels: [],
      filteredBackgroundColor: []
    };
  },
  methods: {
    filterData(labels, frequences) {
      const filteredData = frequences
        .map((value, index) => (value > 0 ? { label: labels[index], value } : null))
        .filter(item => item !== null);

      this.filteredLabels = filteredData.map(item => item.label);
      this.data.datasets[0].data = filteredData.map(item => item.value);
      this.filteredBackgroundColor = this.data.datasets[0].backgroundColor.slice(0, filteredData.length);
      if (filteredData.length > this.data.datasets[0].backgroundColor.length) {
        this.filteredBackgroundColor = this.filteredBackgroundColor.concat(
          Array(filteredData.length - this.data.datasets[0].backgroundColor.length).fill('rgba(204, 204, 204, 0.5)')
        );
      }
    },
    updateChart() {
      nextTick(() => {
        const ctx = document.getElementById('myChart').getContext('2d');
        if (ctx) {
          if (this.chartInstance) {
            this.chartInstance.destroy();
          }
          this.chartInstance = new Chart(ctx, {
            type: 'pie',
            data: {
              labels: this.filteredLabels,
              datasets: [{
                ...this.data.datasets[0],
                data: this.data.datasets[0].data,
                backgroundColor: this.filteredBackgroundColor
              }]
            },
            options: {
              responsive: true,
              plugins: {
                legend: {
                  display: false 
                },
                tooltip: {
                  callbacks: {
                    label: function(context) {
                      const total = context.dataset.data.reduce((acc, value) => acc + value, 0);
                      const value = context.raw;
                      const percentage = ((value / total) * 100).toFixed(2);
                      return `${context.label}: ${percentage}%`;
                    }
                  }
                }
              }
            }
          });
        } else {
          console.error('Failed to get canvas context');
        }
      });
    }
  },
  watch: {
    frequences: {
      immediate: true,
      handler(newFrequences) {
        if (newFrequences && newFrequences.length > 0) {
          this.filterData(this.labels, newFrequences);
          this.updateChart();
        }
      }
    },
    labels: {
      immediate: true,
      handler(newLabels) {
        if (newLabels && newLabels.length > 0) {
          this.filterData(newLabels, this.frequences);
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
.chart-legend-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-legend {
  margin-right: 50px;
}

.custom-legend ul {
  list-style: none;
  padding: 0;
}

.custom-legend li {
  margin-bottom: 5px;
  display: flex;
  align-items: center;
}

.custom-legend li span {
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 10px;
  border-radius: 3px;
}

.chart-container {
  width: 350px;
  height: 350px;
  position: relative;
  margin-left: auto;
  margin-right: auto;
}

canvas {
  width: 100% !important;
  height: 100% !important;
}
</style>

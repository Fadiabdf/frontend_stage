<template>
  <AppNavbar/>
  <div class="chart-container">
    <h1 class="chart-title">Classification des conflits par types:</h1>
    <div class="content">
      <div class="description">
        <h2 class="description-title">Description</h2>
        <p>Voici une description du graphique en anneau. Ce graphique montre la répartition des données entre les différentes catégories représentées par les couleurs.</p>
      </div>
      <div class="chart">
        <DoughnutChart />
      </div>
    </div>
  </div>
</template>

<script setup>
import DoughnutChart from '../components/Graph.vue';
import AppNavbar from '@/components/AppNavbar.vue';
</script>

<style scoped>
.chart-container {
  padding: 20px;
}

.chart-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 5px; 
  display: inline-block; 
  border-bottom: 2px solid #000;
}

.content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.description {
  width: 40%;
  font-size: 16px;
}

.description-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
}

.chart {
  width: 50%;
  display: flex;
  justify-content: center;
}
</style>

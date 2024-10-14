<template>
  <div>
    <AppNavbar />
    <div class="chart-section">
      <div class="flex pt-5 items-center justify-center z-10 text-white-clr">
        <div class="flex justify-center items-center w-11 h-11 bg-blue-clr rounded-full mr-3">
          <img src="../assets/icons/statistiques.png" alt="Header icon" class="w-8 h-8" />
        </div>
        <p class="text-2xl ml-0 font-OPTIAuvantGothic-Bold text-blue-clr t-shadow2">
          Étude des associations entre "{{ concatenatedOptions }}" et les autres options sélectionnées
        </p>
      </div>

      <div class="chart-container">
        <h2 class="font-bold">Métrique : χ2</h2>
        <Khi2 :selectedX="selectedX" :selectedY="selectedY" :descriptors_khi2="descriptors_khi2"/>
      </div>
      <div class="chart-container">
        <h2 class="font-bold">Différence entre χ2 observé et χ2 théorique</h2>
        <Khi2dif :selectedX="selectedX" :selectedY="selectedY" :khi2_theoriques="khi2_theoriques" :descriptors_khi2="descriptors_khi2" />
      </div>
      <p class="text-xl mb-10 text-center"> 
        <em>
          La différence entre les valeurs de χ² observées et théoriques illustre l'écart entre les données empiriques et celles attendues sous l'hypothèse nulle. 
          Une valeur positive indique une dépendance entre les variables, tandis qu'une valeur négative suggère une indépendance.
        </em>
      </p>
      <div class="chart-container">
        <h2 class="font-bold">Métrique : Information Mutuelle</h2>
        <InfoMutuelle :selectedX="selectedX" :selectedY="selectedY" :descriptors="descriptors" />
      </div>
      <p class="text-xl text-center"> 
        <em>
          L'information mutuelle mesure la dépendance entre deux variables en quantifiant la quantité d'information qu'une variable fournit sur l'autre. 
          Une valeur élevée d'information mutuelle indique une forte dépendance entre les variables, signifiant que la connaissance de l'une des variables 
          fournit une quantité significative d'information sur l'autre. À l'inverse, une valeur faible suggère que les variables sont relativement indépendantes.
        </em>
      </p>
    </div>
  </div>
</template>

<script>
import Khi2 from '../components/Khi2_Ann.vue';
import AppNavbar from '../components/AppNavbar.vue';
import InfoMutuelle from '../components/MI_Ann.vue';
import Khi2dif from "../components/chart.vue"

export default {
  components: {
    AppNavbar,
    InfoMutuelle,
    Khi2dif,
    Khi2,
  },
  data() {
    return {
      selectedX: this.$route.query.selectedX ? this.$route.query.selectedX.split(', ') : [],
      selectedY: this.$route.query.selectedY ? this.$route.query.selectedY.split(', ') : [],
      descriptors: JSON.parse(this.$route.query.descriptors || '[]'),
      descriptors_khi2 : JSON.parse(this.$route.query.descriptors_khi2 || '[]'),
      khi2_theoriques: this.$route.query.khi2_theoriques || null
    };
  },
  computed: {
    concatenatedOptions() {
      return this.selectedX.length > 0 ? this.selectedX.join(' + ') :
        this.selectedY.length > 0 ? this.selectedY.join(' + ') :
          'Aucune option sélectionnée';
    }
  },
  mounted() {
    console.log("le khi2",this.khi2_theoriques);
  }
};
</script>

<style scoped>
.chart-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  min-height: 100vh;
}

.main-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
}

.chart-container {
  margin: 20px;
  text-align: center; 
}

.values-display {
  margin-top: 20px;
  text-align: center; 
}
</style>
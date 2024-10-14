<template>
  <div class="page-container">
    <AppNavbar :activeLink="'statistiques'" />
    <div class="flex pt-5 items-center justify-center z-10 text-white-clr">
        <div class="flex justify-center items-center w-11 h-11 bg-blue-clr rounded-full mr-3">
          <img src="../assets/icons/script.png" alt="Header icon" class="w-9 h-9" />
        </div>
        <p class="text-3xl ml-0 font-OPTIAuvantGothic-Bold text-blue-clr t-shadow2">
          Statistiques des scripts
        </p>
      </div>

    <div class="container">
      <h1>{{ title }}</h1>
      <LanguageChart :msg="chartTitle" :frequences="frequences" :labels="labels" />
      <p class="details-text mt-[40px]">Pour plus de détails, veuillez choisir un script à étudier</p>

      <div class="dropdown-container mt-[50px]">
        <Dropdown @optionSelected="handleOptionSelected" />
        <button @click="handleChoose" class="choose-button">Choisir</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import AppNavbar from '../components/AppNavbar.vue'; 
import Dropdown from '../components/DropdownScripting.vue';
import LanguageChart from '../components/GraphScripting.vue';

export default {
  components: {
    AppNavbar,
    Dropdown,
    LanguageChart
  },
  data() {
    return {
      title: "",
      chartTitle: "",
      selectedOption: null,
      frequences: [],
      labels: [] 
    };
  },
  methods: {
    handleOptionSelected(option) {
      this.selectedOption = option; 
    },
    async handleChoose() {
      if (this.selectedOption) {
        try {
          const response = await axios.post('http://localhost:8080/validation/scriptchoisi/', {
            selectedOption: this.selectedOption
          });
          this.frequences = response.data.frequences;
          this.labels = response.data.labels;

          this.$router.push({ path: '/langue', 
          query: 
          { option: this.selectedOption,
            labels: JSON.stringify(response.data.labels),
            frequences: JSON.stringify(response.data.frequences)
          } 
        });

        } catch (error) {
          console.error('Error sending selected option to backend:', error);
        }
      } else {
        console.log('No option selected');
      }
    }
  }
};
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.container {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

h1 {
  font-family: 'OPTIAuvantGothic-Bold', sans-serif;
  font-size: 2rem;
  margin-bottom: 20px;
  text-align: center;
}

.dropdown-container {
  display: flex;
  align-items: center;
  margin-bottom: 40px;
}

.details-text {
  font-family: 'OPTIAuvantGothic-Bold', sans-serif;
  font-size: 1.2rem;
  margin-right: 10px;
}

.choose-button {
  margin-left: 10px;
  padding: 8px 16px;
  font-family: 'OPTIAuvantGothic-Bold', sans-serif;
  font-size: 1rem;
  background-color: #4A90E2;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.choose-button:hover {
  background-color: #357ABD;
}
</style>
<template>
  <div class="min-h-screen flex flex-col">
    <Navbar active="statistiques" />
    <div class="flex flex-col items-center justify-center bg-white mt-4">
      <div class="flex pt-5 items-center justify-center z-10 text-white-clr">
        <div class="flex justify-center items-center w-11 h-11 bg-blue-clr rounded-full mr-3">
          <img src="../assets/icons/resultats.png" alt="Header icon" class="w-8 h-8" />
        </div>
        <p class="text-2xl ml-0 font-OPTIAuvantGothic-Bold text-blue-clr t-shadow2">
          Calcul des associations entre les etiquettes 
        </p>
      </div>

      <div class="flex flex-col items-center w-full max-w-6xl mt-20 px-4"> 
        <div class="flex w-full justify-between gap-8"> 
          <div class="flex flex-col w-full sm:w-1/4 px-2 items-center">
            <div class="flex flex-col items-center w-full">
              <h1 class="font-bold mb-2">Etiquette(s) "X"</h1> 
              <DropdownWithCheckboxes 
                @update:selectedOptions="updateSelectedX" 
                :mots="mots" />
            </div>
          </div>

          <div class="flex flex-col w-full sm:w-1/4 px-2 items-center">
            <div class="flex flex-col items-center w-full">
              <h1 class="font-bold mb-2">Etiquette(s) "Y"</h1>
              <DropdownWithCheckboxes 
                @update:selectedOptions="updateSelectedY" 
                :mots="mots" />
            </div>
          </div>

          <div class="flex flex-col w-full sm:w-1/4 px-2 items-center">
            <div class="flex flex-col items-center w-full">
              <h1 class="font-bold mb-2">Script</h1> 
              <Script @script="updateSelectedScript" />
            </div>
          </div>

          <!-- Liste déroulante pour Langues -->
          <div class="flex flex-col w-full sm:w-1/4 px-2 items-center">
            <div class="flex flex-col items-center w-full">
              <h1 class="font-bold mb-2">Langues</h1> <!-- Increased margin-bottom -->
              <DropdownLangue :script="selectedScript" @update:selectedLanguages="updateSelectedLanguages" />
            </div>
          </div>
        </div>

        <!-- Add more margin to the button to separate it from the dropdown lists -->
        <button @click="calculate" :disabled="loading"
          class="custom-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> 
          Calculer
        </button>

        <div v-if="loading" class="mt-5 text-black-200 font-bold">
          <em>Chargement en cours, veuillez patienter...</em>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import DropdownWithCheckboxes from '../components/AnnotationCkeckBox.vue';
import DropdownLangue from '../components/ChoixLangue.vue';
import Navbar from '../components/AppNavbar.vue';
import Script from '../components/SciptDP.vue';
import axios from 'axios';

export default {
  components: {
    DropdownWithCheckboxes,
    DropdownLangue,
    Navbar,
    Script,
  },
  data() {
    return {
      selectedOptionsX: [],
      selectedOptionsY: [],
      selectedLanguages: [],
      selectedScript: "",
      loading: false,
    };
  },
  methods: {
    updateSelectedX(options) {
      this.selectedOptionsX = options;
    },
    updateSelectedY(options) {
      this.selectedOptionsY = options;
    },
    updateSelectedLanguages(languages) {
      this.selectedLanguages = [...languages];
    },
    updateSelectedScript(script) {
      this.selectedScript = script;
    },
    async calculate() {
      this.loading=true;
      if (
        this.selectedOptionsX.length >= 1 &&
        this.selectedOptionsY.length >= 1 &&
        this.selectedLanguages.length > 0 &&
        this.selectedScript
      ) {
        this.loading = true;

        const payload = {
          selectedX: this.selectedOptionsX,
          selectedY: this.selectedOptionsY,
          languages: this.selectedLanguages,
          script: this.selectedScript,
        };

        try {
          const response = await axios.post('http://127.0.0.1:8000/validation/etqchoisie/', payload, {
            headers: {
              'Content-Type': 'application/json',
            },
          });

          const { selectedOptionsX, selectedOptionsY, descriptors, descriptors_khi2, khi2_theoriques } = response.data;
          console.log("khi2 theoriques",khi2_theoriques)
          this.$router.push({
            name: 'CalculAnn',
            query: {
              selectedX: selectedOptionsX.join(', '),
              selectedY: selectedOptionsY.join(', '),
              selectedLanguages: this.selectedLanguages.join(', '),
              script: this.selectedScript,
              descriptors: JSON.stringify(descriptors),
              descriptors_khi2: JSON.stringify(descriptors_khi2),
              khi2_theoriques: JSON.stringify(khi2_theoriques)
            },
          });
        } catch (error) {
          console.error('Error during API call:', error.response ? error.response.data : error.message);
        } finally {
          this.loading = false;
        }
      } else {
        console.log('Conditions not met');
      }
    },
  },
};
</script>

<style scoped>
.flex.pt-5.items-center.justify-center.z-10.text-white-clr {
  margin-top: 1rem; 
}

.flex.justify-between {
  gap: 2rem; 
}

.bg-white {
  background-color: #ffffff;
}

button {
  background-color: #007bff;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
}

button:hover {
  background-color: #0056b3;
}

.mt-16 {
  margin-top: 0rem; 
}

.mt-20 {
  margin-top: 4rem; 
}

.mt-16 {
  margin-top: 4rem; 
}

.mt-12 {
  margin-top: 3rem;
}

h1 {
  margin-bottom: 0,5rem; 
  display: flex;
  align-items: center; 
}


.custom-button {
  margin-top: 7rem; 
  background-color: #007bff;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;

}

.custom-button:hover {
  background-color: #0056b3;
}

</style>

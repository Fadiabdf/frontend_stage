<template>
  <div class="min-h-screen flex flex-col">
    <Navbar active="statistiques" />
    <div class="flex flex-col items-center justify-center bg-white mt-4">
      <div class="flex pt-5 items-center justify-center z-10 text-white-clr">
        <div class="flex justify-center items-center w-11 h-11 bg-blue-clr rounded-full mr-3">
          <img src="../assets/icons/resultats.png" alt="Header icon" class="w-8 h-8" />
        </div>
        <p class="text-2xl ml-0 font-OPTIAuvantGothic-Bold text-blue-clr t-shadow2">
          Calcul des associations des mots du vocabulaire
        </p>
      </div>

      <div class="flex flex-col items-center w-full max-w-6xl mt-20 px-4">
        <div class="flex w-full justify-between gap-8">
          <div class="flex flex-col w-full sm:w-1/4 px-2 items-center">
            <div class="flex flex-col items-center w-full">
              <h1 class="font-bold mb-2">Mot(s) "X"</h1>
              <DropdownWithCheckboxes @update:selectedOptions="updateSelectedX" :mots="mots" />
            </div>
          </div>

          <div class="flex flex-col w-full sm:w-1/4 px-2 items-center">
            <div class="flex flex-col items-center w-full">
              <h1 class="font-bold mb-2">Mot(s) "Y"</h1>
              <DropdownWithCheckboxes @update:selectedOptions="updateSelectedY" :mots="mots" />
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
              <h1 class="font-bold mb-2">Langues</h1>
              <DropdownLangue :script="selectedScript" @update:selectedLanguages="updateSelectedLanguages" />
            </div>
          </div>
        </div>

        <!-- Button to calculate -->
        <button @click="calculate" :disabled="loading"
          class="mt-16 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Calculer
        </button>

        <!-- Loader message displayed during calculation -->
        <div v-if="loading" class="mt-5 text-black-200 font-bold">
          <em>Chargement en cours, veuillez patienter...</em>
        </div>

        <!-- Button to download the Excel file -->
        <div class="mt-16 text-center">
          <p class="text-lg font-bold inline">Pour voir les résultats des associations des mots de manière binaire</p>
          <div class="mt-2">
            <button :disabled="loading2" @click="downloadExcelFile" class="text-[#3b82f6] hover:text-[#1d4ed8] font-bold ">
              Cliquez ici
            </button>
          </div>
        </div>

        <!-- Loader message displayed during Excel download -->
        <div v-if="loading2" class="mt-5 text-black-500 font-bold">
          <em>Téléchargement en cours, veuillez patienter...</em>
        </div>
      </div>
    </div>
  </div>
</template>





<script>
import axios from 'axios'; 
import DropdownWithCheckboxes from '../components/AnnotationCheckMots.vue';
import DropdownLangue from '../components/ChoixLangue.vue';
import Navbar from '../components/AppNavbar.vue';
import Script from '../components/SciptDP.vue';

import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    DropdownWithCheckboxes,
    Navbar,
    Script,
    DropdownLangue
  },
  data() {
    return {
      selectedOptionsX: [],
      selectedOptionsY: [],
      selectedLanguages: [],
      selectedScript: "",
      loading: false,
      loading2: false,
    };
  },
  computed: {
    ...mapGetters(['getMots']),
    mots() {
      return this.getMots;
    }
  },
  async created() {
    this.fetchMots();
  },
  methods: {
    ...mapActions(['fetchMots']),
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
      if (this.selectedOptionsX.length >= 1 && this.selectedOptionsY.length >= 1) {
        const data = {
          selectedX: this.selectedOptionsX,
          selectedY: this.selectedOptionsY,
          languages: this.selectedLanguages,
          script: this.selectedScript,
        };

        this.loading = true; 

        try {
          const apiUrl = process.env.VUE_APP_API_URL;
          const response = await axios.post(`${apiUrl}/validation/motchoisie/`, data, {
            headers: {
              'Content-Type': 'application/json',
            },
          });

          const { selectedOptionsX, selectedOptionsY, mots, mots_khi2, khi2_theoriques } = response.data;
          console.log("khi2",khi2_theoriques)
          this.$router.push({
            name: 'CalculMots',
            query: {
              selectedX: selectedOptionsX.join(', '),
              selectedY: selectedOptionsY.join(', '),
              selectedLanguages: this.selectedLanguages.join(', '),
              script: this.selectedScript,
              mots: JSON.stringify(mots),
              mots_khi2: JSON.stringify(mots_khi2),
              khi2_theoriques : JSON.stringify(khi2_theoriques)
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
    async downloadExcelFile() {
      this.loading2 = true ; 
      try {
        const apiUrl = process.env.VUE_APP_API_URL;
        const response = await axios.get(`${apiUrl}/validation/download_excel/`, {
          responseType: 'blob',  
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'associations_binaire.xlsx');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error('Error while downloading Excel file:', error.response ? error.response.data : error.message);
      }
    }
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
  margin-top: 4rem; 
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

.inline {
  display: inline;
}
</style>

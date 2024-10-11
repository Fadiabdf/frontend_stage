<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';
import NavBarComponent from '@/components/NavBarComponent.vue';

const comments = ref([]);
const number_comments = ref(0);
const processed_count = ref(0); // nombre des commentaires traités
const progress = ref(0);
const store = useStore();
const isLoading = ref(true);
const isSuccess = ref(false);

let progressInterval;

const startProgress = () => {
  progress.value = 0;
  progressInterval = setInterval(() => {
    if (progress.value < 97) {
      progress.value += 1; 
    }
  }, 3000); // Update progress every 5 sec
};

onMounted(async () => {
  const selectedCriteria = store.getters.getCriteria;
  console.log('Criteria: ', selectedCriteria);

  if (!selectedCriteria || selectedCriteria.length === 0) {
    console.log('No criteria selected');
    alert("pas de critères séléctionnés");
    return;
  }

  startProgress();

  try {
    const apiUrl = process.env.VUE_APP_API_URL;
    const response = await axios.post(`${apiUrl}/validation/deep_clean_text/`, { criteria: selectedCriteria });
    console.log('Response Data:', response.data);

    clearInterval(progressInterval); 
    progress.value = 100; // Complete the progress

    comments.value = response.data.raw_and_cleaned;
    number_comments.value = response.data.total_comments;
    processed_count.value = response.data.processed_count;
    isLoading.value = false; 
    isSuccess.value = true; 
  } catch (error) {
    console.error('API Error:', error);
    isLoading.value = false; 
    clearInterval(progressInterval); 
  }
});

</script>


<template>
  <header>
    <NavBarComponent />
  </header>
  <div class="bg-white-clr w-full h-auto flex justify-between items-center">
  <div class="cercle-background">
    <div class="justify-center items-center w-full">
      <p class="p-10 pb-4 text-3xl font-OPTIAuvantGothic-Bold text-white-clr t-shadow">Résultats du prétraitement :</p>
      <div class="bg-blueW-clr bg-opacity-50 rounded-2xl p-5 m-5 w-[95%] justify-center items-center border">

        <template v-if="!isLoading && isSuccess">
          <div class=" overflow-y-auto max-h-96 custom-scrollbar pr-5">
            <div class="flex justify-between">
              <p class="text-2xl font-OPTIAuvantGothic-Bold text-black-clr w-1/2 text-left pb-3">Avant Nettoyage :</p>
              <p class="text-2xl font-OPTIAuvantGothic-Bold text-black-clr w-1/2 text-left pb-3">Après Nettoyage :</p>
            </div>
            <div class="w-full h-full flex flex-col" style="max-height: 100%;">
                 <table class="table-auto w-full font-abeezee text-black-clr bg-blueW-clr rounded-2xl border-separate border-spacing-0 custom-table overflow-hidden h-full" style="border: 1px solid black; table-layout: fixed; max-height: 100%;">
                     <tbody>
                      <template v-if="comments.length === 0">
                          <p class=" text-center text-black-clr text-3xl font-abeezee justify-center items-center pt-[150px] h-96">
                            pas de commentaires traités
                          </p>
                      </template> 
                      <template v-else>
                          <tr v-for="(comment, index) in comments" :key="index" class="h-full">
                            <td class="w-1/2 break-words p-4">{{ comment.before || '/pas de texte/' }}</td>
                            <td class="w-1/2 break-words p-4">{{ comment.after || '/pas de texte/' }}</td>
                          </tr>
                      </template>
                    </tbody>
                </table>
            </div>
          </div>
        </template>

        <template v-else>
          <p class="loading-message text-center text-black-clr text-3xl font-abeezee justify-center items-center pt-[150px] h-96 t-shadow"><i>Pré-traitement en cours...</i></p>
        </template>

      </div>

      <template v-if="isLoading">
        <div class="flex-row items-center w-[90%] mx-auto mt-4 mb-6">
          <div class="pr-20 text-right text-black-clr font-OPTIAuvantGothic-Bold">
            Nettoyage en cours ... <span class="ml-1" id="progressText">{{ progress }}%</span>
          </div>
          <div class="progress-container h-8 w-[92%] border border-black bg-blue-clr rounded-full overflow-hidden shadow-md mt-1">
            <div class="m-2 h-1/2 w-[99%] bg-white-clr rounded-full">
              <div class="m-0 h-4 w-1/2 left-0 bg-blueG-clr rounded-full" :style="{ width: `${progress}%` }"></div>
            </div>
          </div>
        </div>
      </template>

      <template v-if="!isLoading && isSuccess">
        <div class="flex-row items-center w-[90%] mx-auto mt-4 mb-6">
          <p class="text-blueG-clr text-right mr-7 font-OPTIAuvantGothic-Bold">Nettoyage terminé de {{ processed_count }} commentaires / {{ number_comments }} commentaires au total </p>
        </div>
      </template>
    </div>
  </div>
</div>

</template>

<style scoped>
.cercle-background {
  background-image: url('../assets/icons/Line.png');
  background-size: contain;
  background-position: absolute;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
}

@font-face {
  font-family: 'OPTIAuvantGothic-Bold';
  src: url('../assets/fonts/OPTIAuvantGothic-Bold.otf') format('truetype');
}

.t-shadow {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6),
               0 0 1px rgba(255, 255, 255, 0.5);
}

.custom-table td {
  border: 1px solid #282830;
  padding: 16px;
  width: 50%;
  color: #282830;
}

.custom-scrollbar {
  scrollbar-width: auto;
  scrollbar-color: #57D7EC #FBFBF3;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 16px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #FBFBF3;
  border-radius: 25px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  margin-right: 5px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #57D7EC;
  border-radius: 25px;
  border: 3px solid #FBFBF3;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

.custom-scrollbar::-webkit-scrollbar-button {
  display: none;
}

.progress-container {
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  margin-top: 20px;
}
@keyframes fadeInOut {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

/* animation to the loading message */
.loading-message {
  animation: fadeInOut 2s infinite;
}
</style>

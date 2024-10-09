<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import NavBarComponent from '@/components/NavBarComponent.vue';

const store = useStore();
const router = useRouter();
const cleaningCriteria = ref([
  { label: 'Supprimer les lettres arabes', value: 'remove_arabic_letters', checked: false },
  { label: 'Supprimer la ponctuation', value: 'remove_punctuation', checked: false },
  { label: 'Convertir les emojis en texte', value: 'convert_emojis', checked: false },
  { label: 'Supprimer les stop words (fr/en/ar)', value: 'remove_stop_words', checked: false },
  { label: 'Eliminier l\'exagération', value: 'remove_exaggeration', checked: false },
  { label: 'Remplacer les abréviations et les acronymes', value: 'replace_abbreviations', checked: false },
  { label: 'Lemmatisation', value: 'lemmatize', checked: false },
  { label: 'Convertir les chiffres d\'arabizi en lettres', value: 'arabizi_lettres_conversion', checked: false },
  { label: 'Supprimer les nombres', value: 'remove_numbers', checked: false },
  { label: 'Supprimer les mots courts (moins de 2 lettres)', value: 'remove_small_words', checked: false },
  { label: 'Eliminer la répétition des mots et des expressions',value:'remove_redundent_words_and_expressions',checked: false},
  { label: 'Procéder à la normalisation linguistique',value:"normalizing text",checked:false},
  { label: 'Toutes les opérations', value: 'all', checked: false },
]);

const handleClean = () => {
  const allCriteriaValues = [
    'remove_arabic_letters',
    'remove_punctuation',
    'convert_emojis',
    'remove_stop_words',
    'remove_exaggeration',
    'replace_abbreviations',
    'lemmatize',
    'arabizi_lettres_conversion',
    'remove_numbers',
    'remove_small_words',
    'remove_redundent_words_and_expressions',
    'normalizing text',
  ];
  let  selectedCriteria = cleaningCriteria.value
    .filter(c => c.checked)
    .map(c => c.value);

  // If "Toutes les opérations" is selected, replace selectedCriteria with all criteria values
  if (selectedCriteria.includes('all')) {
    selectedCriteria = allCriteriaValues;
  }

    if (!selectedCriteria.length) {
    alert("Veuillez sélectionner au moins un critère de nettoyage.");
    return;
  }

  store.dispatch('updateCriteria', selectedCriteria);
  router.push({ name: 'PreProcessing' });
};


</script>


<template>
  <header>
    <NavBarComponent />    
  </header>  
  <div class="bg-white-clr w-full h-auto flex justify-between items-center">
    
     <div class="cercle-background flex "> 
      <div class="justify-center items-center p-5 w-full"> 
       <img src="../assets/icons/Ellipse1.png" alt="White Shape" class="absolute z-10 w-[680px] h-[100px] transform -translate-x-1/2 left-[30%]" />
        <div class="flex  pt-7 items-center justify-center absolute  left-[29%] transform -translate-x-1/2 z-10 text-white-clr ">
           <div class="flex justify-center items-center w-11 h-11 bg-blue-clr rounded-full mr-3">
              <img src="../assets/icons/broom.png" alt="Header icon" class="w-9 h-9" />
           </div>
           <p class="text-2xl ml-0  font-OPTIAuvantGothic-Bold text-blue-clr t-shadow2">
             Prétraitement des Commentaires 
           </p>
        </div>
        <div class="additional-message">
          <p class="text-[1.2rem] ml-2.5 text-left  text-black-clr font-abeezee t-shadow2">
             Nettoyez les commentaires en choisissant des critères de nettoyage
          </p>
        </div>

        <div class="relative mt-5 ml-24  bg-blueW-clr p-5 rounded-3xl w-4/5 top-8 left-24">
          
           <!-- Overlay to appear under the first rectangle -->
           <div class="absolute -top-10 -left-10 w-full h-full bg-[#80D4FF]/50 rounded-3xl z-0"></div>
          <!-- Main content -->
          
          <div class="relative">
            <div class="overflow-y-auto h-96 custom-scrollbar pr-5">
            <p class="text-xl pl-4  t-shadow   text-left font-OPTIAuvantGothic-Bold text-white-clr  mb-4">
              sélectionnez les critères de nettoyage :</p>
              <div class="flex justify-between">
                <div class="w-1/2">
                 <ul class="list-none p-0">
                  <li class="my-3 flex items-center" v-for="(criterion, index) in cleaningCriteria.slice(0, Math.ceil(cleaningCriteria.length / 2))" :key="index">
                   <label class="flex items-center text-xl pl-4   text-black-clr font-abeezee" >
                    <div class="flex items-center">
                         <input type="checkbox" v-model="criterion.checked" class="form-checkbox h-5 w-5 custom-checkbox "/>
                         <span class="ml-3 text-[1.2rem] font-abeezee text-black-clr">{{ criterion.label }}</span>
                    </div>
                   </label>
                 </li>
                 </ul>
               </div>
             <div class="w-1/2">
          <ul class="list-none p-0">
            <li class="my-3 flex items-center" v-for="(criterion, index) in cleaningCriteria.slice(Math.ceil(cleaningCriteria.length / 2))" :key="index">
              <label class="flex items-center text-xl pl-4   text-black-clr font-abeezee">
                <div class="flex items-center">
                         <input type="checkbox" v-model="criterion.checked" class="form-checkbox h-5 w-5 custom-checkbox"/>
                         <span class="ml-3 text-[1.2rem] font-abeezee text-black-clr">{{ criterion.label }}</span>
                </div>
              </label>
            </li>
          </ul>
        </div>
      </div> 
    
    
    </div>
  </div>
    
    
  </div>
  <button  @click="handleClean" class="button-clean">
         <div class="button-text">
           Nettoyer
         <span class="hover-underline"></span>
         </div>  
      </button>    
      </div>
    </div>   
  </div>  
</template>

<script>
export default {
  name: 'TextPreprocessing',
};
</script>

<style scoped>
.cercle-background {
  background-image: url('../assets/icons/Line.png');
  background-size:contain; 
  background-position:absolute;
  background-repeat: no-repeat; 
  width: 100%; 
  height:100%;
  
}

.white-shape {
  position: absolute;
  top: 20px;
  width: 880px;
  height: 110px;
  transform: translateX(-50%);
  z-index: 1;
  left: 38%;
}

.header {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 30px;
  left: 35%;
  transform: translateX(-50%);
  z-index: 2;
  padding: 0.5rem 1rem;
  font-family: 'Potta One', cursive;
  color: white;
  background: transparent;
}

.header-icon-circle {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 65px;
  height: 65px;
  background-color: #369ff4;
  border-radius: 50%;
  margin-right: 10px;
}

.header-icon {
  width: 30px;
  height: 30px;
}
.additional-message {
  margin-top: 125px;
  margin-left: 100px;
}

.additional-text {
  color: rgb(0, 0, 0);
  font-size: 1.2rem;
  margin-left: 10px; 
  text-align: left; 
  font-family: 'Aabeezee', cursive;
}

.cleaning-criteria {
  background-color: #80D4FF; 
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
  margin-left: 60px;
  width: 80%; 
  top:35px;
  left:90px;
  position: relative; 
}

.criteria-outer-container {
  position: relative;
}
.criteria-outer-container-overlay {
  position: absolute;
  top: -40px; 
  left: -40px; 
  width: 100%;
  height: 100%;
  background-color: rgba(128, 212, 255, 0.5); 
  border-radius: 10px;
  z-index: -1; 
}

.criteria-container {
  display: flex;
  justify-content: space-between;
}

.criteria-column {
  width: 48%; 
}

.cleaning-criteria ul {
  list-style-type: none;
  padding: 0;
}

.cleaning-criteria li {
  margin: 10px 0;
  display: flex;
  align-items: center;
}

.cleaning-criteria label {
  font-family: 'Aabeezee', cursive;
  font-size: 1.2rem;
  color: #333;
}

.cleaning-criteria input[type="checkbox"] {
  margin-right: 10px;
  width: 20px; 
  height: 20px; 
}

.clean-button:hover {
  background-color: #1a66b8;
}

@font-face {
  font-family: 'OPTIAuvantGothic-Bold';
  src: url('../assets/fonts/OPTIAuvantGothic-Bold.otf') format('truetype');
}

.t-shadow2 {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2),
              0 0 1px rgba(255, 255, 255, 0.5);
}
.t-shadow {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6),
              0 0 1px rgba(255, 255, 255, 0.5);
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

.button-clean {
  display: block;
  position: relative;
  padding: 12px;
  width: 13%; 
  margin-right: 16px; 
  margin-left: 950px; 
  margin-top: 0px; 
  background-color: #FBFBF3; 
  border: none;
  border-radius: 12px; 
  cursor: pointer;
  outline: none;
  
}

.button-text {
  font-family: 'OPTIAuvantGothic-Bold', sans-serif; 
  text-align: center;
  font-size: 1.3rem; 
  color: #282830; 
  position: relative;
  padding-bottom: 2px; 
}

.hover-underline {
  position: absolute;
  left:0;
  bottom: 0;
  width: 100%;
  height: 4px;
  background-color: transparent;
  transition: background-color 1s opacity 1s; 
  filter: blur(0); 
}

.button-text:hover .hover-underline {
  background-color: #57D7EC; 
  filter: blur(2px);
}
.custom-checkbox {
  background-color: #2180DE; 
}

.custom-checkbox:focus {
  outline: none; 
}

.custom-checkbox:checked {
  background-color: #2180DE; 
  border: 2px solid #2180DE; 
}

.custom-checkbox:checked:hover {
  background-color: #80D4FF; 
  border: 2px solid #80D4FF; 
}

</style>

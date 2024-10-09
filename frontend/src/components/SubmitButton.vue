<template>
  <button @click="handleClick"
    class="inline-flex justify-center items-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-center">
    Choisir
  </button>
</template>

<script>
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
  props: {
    selectedOption: {
      type: String,
      required: true
    }
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
    async handleClick() {
      let correlationValue;
      switch (this.selectedOption) {
        case "Associations entre étiquettes":
          correlationValue = 1;
          this.router.push('/correlation-terms-classes');
          break;
        case "Associations entre mots":
          correlationValue = 2;
          this.router.push('/correlation-mots');
          break;
        case "Classification des conflits par types":
          correlationValue = 3;
          this.router.push('/type');
          break;
        case "Frequence et pourcentage de conflits par langues":
          correlationValue = 4;
          this.router.push('/scripting');
          break;
        default:
          console.log("Aucune option valide sélectionnée");
          return; 
      }


      try {
        await axios.post('your-backend-endpoint', { value: correlationValue });
      } catch (error) {
        console.error('Error sending value to the backend:', error);
      }
    }
  }
};
</script>

<style scoped>
button {
  font-family: 'OPTIAuvantGothic-Bold', sans-serif;
  font-size: 1.3rem;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

button:hover {
  color: #57D7EC;
  /* Change text color to blue on hover */
}
</style>

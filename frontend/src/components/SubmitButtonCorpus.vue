<template>
    <button @click="handleClick"
        class="inline-flex justify-center items-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-center">
        Choisir
    </button>
</template>

<script>
import axios from 'axios';

export default {
    props: {
  selectedOption: {
    type: String,
    required: true,
    default: ''
  }
},
    methods: {
        handleClick() {
            axios.post('http://127.0.0.1:8000/validation/corpuschoisi/', {
                selectedOption: this.selectedOption,
            }).catch(error => {
                console.error('Error sending option to backend:', error);
            });
            this.$router.push({ name: 'Statistiques'});
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
}
</style>

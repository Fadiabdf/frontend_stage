<template>
    <div class="relative inline-block text-left">
        <div>
            <button @click="toggleMenu" type="button"
                class="inline-flex justify-center w-full rounded-md shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                {{ buttonText }}
                <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                    fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd"
                        d="M5.293 9.707a1 1 0 011.414 0L10 13.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd" />
                </svg>
            </button>
        </div>

        <div v-if="isOpen"
            class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
            <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <a v-for="item in items" :key="item" href="#"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 break-words whitespace-normal max-w-full"
                    @click="selectItem(item)">
                    {{ item }}
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            isOpen: false,
            buttonText: "Corpus",
            items: [],
        };
    },
    methods: {
        toggleMenu() {
            this.isOpen = !this.isOpen;
        },
        selectItem(item) {
            console.log('Selected option:', item); 
            this.buttonText = item;
            this.isOpen = false;
            this.$emit('optionSelected', item);
        },
        async fetchItems() {
            try {
                const apiUrl = process.env.VUE_APP_API_URL;
                const response = await axios.get(`${apiUrl}/validation/listecorpus/`);
                this.items = response.data; 
            } catch (error) {
                console.error('Error fetching items:', error);
                this.items = ['Corpus1', 'Corpus2'];
            }
        }
    },
    mounted() {
        this.fetchItems();
    }
};
</script>

<style scoped>
button {
    font-family: 'OPTIAuvantGothic-Bold', sans-serif;
    font-size: 1.3rem;
    border: none;
}

a {
    font-family: 'OPTIAuvantGothic-Bold', sans-serif;
    font-size: 15px;
    word-wrap: break-word;
}
</style>

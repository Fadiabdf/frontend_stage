<template>
  <div class="relative inline-block text-left">
    <div>
      <button @click="toggleDropdown" type="button"
        class="inline-flex justify-center w-full rounded-md border border-blue-500 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Etiquettes
        <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
          aria-hidden="true">
          <path fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd" />
        </svg>
      </button>
    </div>

    <div v-if="isOpen"
      class="origin-top-right absolute right-0 mt-2 w-56 rounded-md border border-blue-500 shadow-lg bg-white ring-1 ring-black ring-opacity-5 max-h-60 overflow-y-auto">
      <div class="py-1 shadow-md">
        <label v-for="etiquette in etiquettes" :key="etiquette"
          class="flex items-center px-4 py-2 text-sm text-gray-700 font-semibold hover:bg-blue-600 cursor-pointer transition-colors">
          <input type="checkbox" :value="etiquette" v-model="selectedOptions" @change="emitSelectedOptions"
            class="mr-2">
          {{ etiquette }}
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      isOpen: false,
      selectedOptions: [],
    };
  },
  computed: {
    ...mapGetters(['getEtiquettes']),
    etiquettes() {
      return this.getEtiquettes;
    }
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    emitSelectedOptions() {
      this.$emit('update:selectedOptions', this.selectedOptions);
    },
  },
};
</script>

<style scoped>
.max-h-60 {
  max-height: 15rem;
  overflow-y: auto;
}

input[type="checkbox"] {
  border-color: #3b82f6; 
}
</style>

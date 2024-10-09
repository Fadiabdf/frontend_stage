<template>
  <div class="relative inline-block text-left">
    <div>
      <button @click="toggleDropdown" type="button"
        class="inline-flex justify-center w-full rounded-md border border-blue-500 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Langues
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
      <div class="py-1">
        <label v-for="language in filteredLanguages" :key="language.value"
          class="flex items-center px-4 py-2 text-sm text-gray-700 font-semibold hover:bg-blue-600 cursor-pointer transition-colors">
          <input type="checkbox" :value="language.value" v-model="selectedLanguages" @change="emitSelectedLanguages"
            class="mr-2">
          {{ language.label }}
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    script: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isOpen: false,
      selectedLanguages: [],
      languagesOptions: {
        "Latin Script": [
          { label: "Anglais", value: "EN" },
          { label: "Français", value: "FR" },
          { label: "Arabizie", value: "AZL" },
          { label: "Tamazight Latin", value: "TZL" },
          { label: "Emojis", value: "EMT"}
        ],
        "Arabic Script": [
          { label: "Tamazight Abjadia", value: "TZA" },
          { label: "Dialecte arabe", value: "AZA" },
          { label: "Arabe standard moderne", value: "ARS" },
          { label: "Emojis", value: "EMT"}
        ],
        "Mixed Script": [
          { label: "Anglais", value: "EN" },
          { label: "Français", value: "FR" },
          { label: "Arabizie", value: "AZL" },
          { label: "Tamazight Latin", value: "TZL" },
          { label: "Tamazight Abjadia", value: "TZA" },
          { label: "Dialecte arabe", value: "AZA" },
          { label: "Arabe standard moderne", value: "ARS" },
          { label: "Emojis", value: "EMT"}
        ]
      }
    };
  },
  computed: {
    filteredLanguages() {
      return this.languagesOptions[this.script] || [];
    }
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    emitSelectedLanguages() {
      this.$emit('update:selectedLanguages', this.selectedLanguages);
    }
  }
};
</script>

<style scoped>
.dropdown-menu {
  max-height: 10rem; 
  overflow-y: auto;
}
</style>

<template>
  <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
    <div class="bg-white rounded-[26px] shadow-lg p-12 w-4/5 max-w-4xl border-blue-500 border-2 relative ">
      <div class="flex justify-between items-start mb-4">
        <h2 class="text-3xl font-semibold">{{ title }}</h2>
        <button @click="closePopup" class="text-gray-400 hover:text-gray-600">
          &times;
        </button>
      </div>
      <div class="mb-6">
        <strong>Date de publication:</strong> {{ date_publication  }}
      </div>
      <div class="mb-6">
        <strong>Lien:</strong> <a :href="link" class="text-blue-500 hover:underline">{{ lien_video }}</a>
      </div>
      <div class="mb-6">
        <strong>Description:</strong> {{ description }}
      </div>
      <div class="mb-6">
        <strong>Hashtags:</strong> {{ hashtags }}
      </div>
      <div class="mb-6">
        <strong>Nombre des commentaires:</strong> {{ commentsCount }}
      </div>
      <div class="absolute bottom-4 right-4">
        <button @click="toggleDropdown" class="inline-flex items-center rounded-[16px] border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-black">
          Annoter
          <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v10.586l3.293-3.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L9 14.586V4a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
        </button>
        <div v-if="isDropdownOpen" class="origin-top-right absolute right-0 mt-2 w-56 rounded-[22px] shadow-lg bg-white ring-1 ring-black ring-opacity-5 border-black border-2">
          <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-[#2180DE] rounded-[16px]" role="menuitem">Conflit</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-[#2180DE] rounded-[16px]" role="menuitem">Non Conflit</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PopupComponent",
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      required: true,
    },
    publicationDate: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    hashtags: {
      type: String,
      required: true,
    },
    commentsCount: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      isDropdownOpen: false,
    };
  },
  methods: {
    closePopup() {
      this.$emit('close');
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
  },
};
</script>

<style scoped>
/* Additional styles for PopupComponent */
</style>

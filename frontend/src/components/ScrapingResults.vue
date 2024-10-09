<template>
  <main class="p-6">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold">Résultats du scraping</h2>
      <button @click="toggleDropdown" class="inline-flex justify-center w-full rounded-[16px] border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
          Annoter
          <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v10.586l3.293-3.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L9 14.586V4a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
        </button>
        <div v-if="isDropdownOpen" class="origin-top-right absolute right-0 mt-2 w-56 rounded-[22px] shadow-lg bg-white ring-1 ring-black ring-opacity-5 border-black border-2">
          <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-[#2180DE]  rounded-[16px]" role="menuitem">Conflit</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-[#2180DE] rounded-[16px]" role="menuitem">Non Conflit</a>
          </div>
        </div>
    </div>
    <div class="space-y-4">
      <div class="border border-blue-500 rounded-lg p-4 bg-gray-100" v-for="(result, index) in results" :key="index">
        <p><strong>Titre:</strong> {{ result.title }}</p>
        <p><strong>Description:</strong> {{ result.description }}</p>
        <p><strong>Hashtags:</strong> {{ result.hashtags }}</p>
        <a href="#" class="text-blue-500 underline">Voir plus</a>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'ScrapingResults',
  data() {
    return {
      results: [
        {
          title: "Lorem Ipsum is simply dummy Lorem Ipsum has been the industry's standard dummy",
          description: "Lorem Ipsum is simply dummy text ever since the 1500s, when an unknown printer took...",
          hashtags: "Lorem Ipsum has been the industry's standard..."
        },
        {
          title: "Lorem Ipsum is simply dummy Lorem Ipsum has been the industry's standard dummy",
          description: "Lorem Ipsum is simply dummy text ever since the 1500s, when an unknown printer took...",
          hashtags: "Lorem Ipsum has been the industry's standard..."
        },
        {
          title: "Lorem Ipsum is simply dummy Lorem Ipsum has been the industry's standard dummy",
          description: "Lorem Ipsum is simply dummy text ever since the 1500s, when an unknown printer took...",
          hashtags: "Lorem Ipsum has been the industry's standard..."
        }
      ]
    };
  }
};
</script>

<style scoped>
/* Custom styles, if any */
</style>

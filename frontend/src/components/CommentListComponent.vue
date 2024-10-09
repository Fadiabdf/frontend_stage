<template>
  <div class="container  mx-auto  p-2 bg-white border-2 m-6 rounded-[20px]">
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-2xl font-semibold text-[#2180DE]">La liste des commentaires</h1>
      <button
        @click="goBack"
        class="flex items-center justify-center w-10 h-10 border-2 border-black text-black rounded-full hover:bg-gray-200 transition duration-300"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>
    </div>
    <div class="space-y-4">
      <div
        v-for="(result, index) in results"
        :key="index"
        class="border-2 border-[#2180DE] rounded-[22px] p-4 cursor-pointer"
        
      >
      <h2 class="text-lg font-semibold">
          <span class="text-[#2180DE]">Auteur:</span> <span class="text-black font-normal">{{ result.Auteur }}</span>
        </h2>
        <h2 class="text-lg font-semibold">
          <span class="text-[#2180DE]">Date de publication:</span> <span class="text-black font-normal">{{ result.date_publication }}</span>
        </h2>
        <h2 class="text-lg font-semibold">
          <span class="text-[#2180DE]">Texte:</span> <span class="text-black font-normal">{{ result.Texte }}</span>
        </h2>
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommentListComponent',
  data() {
    return {
      results: [
        {
          Auteur: "Lorem Ipsum",
          date_publication: "XX/XX/XXXX",
          Texte: "#dummy #text Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          selected: false,
        },
        {
          Auteur: "Lorem Ipsum",
          date_publication: "XX/XX/XXXX",
          Texte: "#dummy #text Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          selected: false,
        },
        {
          Auteur: "Lorem Ipsum",
          date_publication: "XX/XX/XXXX",
          Texte: "#dummy #text Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          selected: false,
        },
        {
          Auteur: "Lorem Ipsum",
          date_publication: "XX/XX/XXXX",
          Texte: "#dummy #text Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          selected: false,
        },
        // Other results...
      ],
    };
  },
  methods: {
    toggleSelection(index) {
      this.results[index].selected = !this.results[index].selected;
    },
    goBack() {
      alert('Going back!');
    },
  },
};
</script>

<style scoped>
/* Custom styles, if any */
</style>

<template>
  <div class="min-h-screen bg-[#2180DE] p-4">
    <div class="relative p-4 mb-4 rounded-[24px] text-left border-[#2180DE] border-2 m-4 bg-white">
      <div class="flex items-center justify-between mb-4">
        <!-- Return Arrow Button -->
        <h2 class="text-xl font-bold mb-4 text-[#2180DE]">La liste des commentaires</h2>
        <button @click="goBack" class="flex items-center justify-center w-10 h-10 border-2 border-black text-black rounded-full hover:bg-gray-200 transition duration-300 m-6">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <!-- Header Title -->
      
        <!-- Annoter Button -->
        
      </div>
      <div v-for="(comment, index) in comments" :key="index" class="relative p-4 mb-4 rounded-[24px] text-left border-[#2180DE] border-2">
        <button @click="toggleDropdown(index)" class="absolute top-2 right-2 py-2 px-4 bg-white text-black rounded-[24px] flex items-center border-black border-2">
          Emotion
          <svg class="ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v10.586l3.293-3.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L9 14.586V4a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
        </button>

        <p><span class="text-[#2180DE]"><strong>Auteur:</strong></span> {{ comment.author }}</p>
        <p><span class="text-[#2180DE]"><strong>Date de publication:</strong></span> {{ comment.date }}</p>
        <p><span class="text-[#2180DE]"><strong>Texte:</strong></span> {{ comment.text }}</p>

        <div v-if="isDropdownVisible && selectedCommentIndex === index" class="absolute right-2 top-12 bg-white shadow-md z-10 p-2 w-48 rounded-[16px] border-black border-2">
          <ul class="list-none p-0 m-0">
            <li v-for="(emotion, emotionIndex) in emotions" :key="emotionIndex" @click="selectEmotion(emotion)" class="block px-4 py-2 text-sm text-gray-700 hover:bg-[#2180DE] rounded-[22px] border-black">
              {{ emotion }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      comments: [
        { author: 'Ipsum is simply dummy Lorem', date: 'DD MM YYYY', text: 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s...' },
        { author: 'Ipsum is simply dummy Lorem', date: 'DD MM YYYY', text: 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s...' },
        { author: 'Ipsum is simply dummy Lorem', date: 'DD MM YYYY', text: 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s...' },
        // Add more comments as needed
      ],
      emotions: ['Colère', 'Agressivité', 'Dégoût', 'Haine'],
      isDropdownVisible: false,
      selectedCommentIndex: null,
    };
  },
  methods: {
    goBack() {
      alert('Going back!');
    },
    toggleDropdown(index) {
      if (this.selectedCommentIndex === index && this.isDropdownVisible) {
        this.isDropdownVisible = false;
        this.selectedCommentIndex = null;
      } else {
        this.selectedCommentIndex = index;
        this.isDropdownVisible = true;
      }
    },
    selectEmotion(emotion) {
      if (this.selectedCommentIndex !== null) {
        alert(`Selected emotion for comment ${this.selectedCommentIndex + 1}: ${emotion}`);
        this.isDropdownVisible = false;
        this.selectedCommentIndex = null;
      }
    },
    annotate() {
      alert('Annoter button clicked!');
    }
  },
};
</script>

<style scoped>
/* Additional styles for PopupComponent */
</style>

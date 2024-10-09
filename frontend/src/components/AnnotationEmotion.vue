<template>
  <div class="container mx-auto p-4 bg-white m-4 rounded-[22px]">
    <h1 class="text-xl font-semibold mb-4">La liste des commentaires</h1>
    <ul>
      <li 
        v-for="comment in comments" 
        :key="comment.id_commentaire" 
        class="relative border-2 border-[#2180DE] p-4 mb-4 rounded-[22px]"
      >
        <!-- Emotions Dropdown at the top right -->
        <div class="absolute top-2 right-2">
          <div class="relative inline-block text-left">
            <button @click="toggleDropdown(comment.id_commentaire)" class="inline-flex justify-center w-full rounded-[22px] border border-black shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
              Emotion
              <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
            <div v-if="isDropdownOpen(comment.id_commentaire)" class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div class="py-1 max-h-48 overflow-y-auto">
                <label v-for="emotion in emotions" :key="emotion.name" class="flex items-center px-4 py-2">
                  <input 
                    type="checkbox" 
                    :value="emotion.name" 
                    v-model="comment.emotion" 
                    @change="showUpdateButton(comment.id_commentaire)"
                    class="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                  >
                  <span class="ml-2 text-sm text-gray-700">{{ emotion.name }}</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Comment details -->
        <div class="mb-2">
          <span class="text-[#2180DE]">Auteur:</span> <span class="text-black">{{ comment.auteur }}</span>
        </div>
        <div class="mb-2">
          <span class="text-[#2180DE]">Date de publication:</span> <span class="text-black">{{ formatDate(comment.date_publication) }}</span>
        </div>
        <div class="mb-4">
          <span class="text-[#2180DE]">Texte:</span> <span class="text-black">{{ comment.texte }}</span>
        </div>

        <!-- Update Button -->
        <button 
          v-if="comment.showUpdateButton && isDropdownOpen(comment.id_commentaire)" 
          @click="updateEmotion(comment.id_commentaire)" 
          :class="{'bg-blue-500 hover:bg-blue-600': comment.emotion.length > 0, 'bg-transparent text-gray-500': comment.emotion.length === 0}"
          class="mt-4 px-4 py-2 text-white rounded-md"
        >
          Mettre à jour les émotions
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      comments: [],
      emotions: [], // Array to store the fetched emotions
      dropdownOpen: {} // Object to track which dropdown is open
    };
  },
  async created() {
    await this.fetchComments();
    await this.fetchEmotions(); // Fetch emotions when the component is created
  },
  methods: {
    async fetchComments() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/validation/get_comments/');
        this.comments = response.data.map(comment => ({
          ...comment,
          showUpdateButton: false // Add property to track button visibility
        }));
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    },
    async fetchEmotions() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/validation/emotions/');
        this.emotions = response.data;
      } catch (error) {
        console.error('Error fetching emotions:', error);
      }
    },
    async updateEmotion(commentId) {
      try {
        const comment = this.comments.find(c => c.id_commentaire === commentId);
        const response = await axios.post('http://127.0.0.1:8000/validation/update_emotion/', {
          comment_id: commentId,
          annotation_commentaire: comment.annotation_commentaire,
          emotion: comment.emotion
        });
        
        if (response.data.success) {
          alert('Comment updated successfully');
          comment.showUpdateButton = false; // Hide the button after updating
          this.dropdownOpen = { ...this.dropdownOpen, [commentId]: false }; // Close the dropdown
        } else {
          alert('Error updating comment');
        }
      } catch (error) {
        console.error('Error updating comment:', error);
      }
    },
    formatDate(date) {
      // Format the date as DD MM YYYY
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString('fr-FR', options);
    },
    toggleDropdown(commentId) {
      const isOpen = this.isDropdownOpen(commentId);
      this.dropdownOpen = { ...this.dropdownOpen, [commentId]: !isOpen };
      if (!isOpen) {
        this.comments.find(c => c.id_commentaire === commentId).showUpdateButton = true;
      } else {
        this.comments.find(c => c.id_commentaire === commentId).showUpdateButton = false;
      }
    },
    isDropdownOpen(commentId) {
      return !!this.dropdownOpen[commentId];
    },
    showUpdateButton(commentId) {
      this.comments.find(c => c.id_commentaire === commentId).showUpdateButton = true;
    }
  }
};
</script>

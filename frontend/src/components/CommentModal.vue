<template>
  <div 
    v-if="visible" 
    class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50" 
    @click="closeModal"
  >
    <div :class="modalClass" @click.stop>
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-normal text-blue-500">Liste des commentaire</h2>
        <button 
          class="text-gray-500 hover:text-red-600 text-2xl font-bold" 
          @click="closeModal"
        >&times;</button>
      </div>
      <div class="comments-container">
        <div 
          v-for="(comment, index) in commentaires" 
          :key="`${comment.nom_utilisateur}-${comment.date_publication}-${index}`" 
          class="bg-blue-100 border border-blue-300 p-4 mb-4 rounded-[22px]"
        >
          <p><strong class="text-blue-500">Utilisateur:</strong> {{ comment.nom_utilisateur }}</p>
          <p><strong class="text-blue-500">Date de publication:</strong> {{ comment.date_publication }}</p>
          <p><strong class="text-blue-500">Commentaire:</strong> {{ comment.texte_commentaire }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommentModal',
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    commentaires: {
      type: Array,
      required: true
    },
    isFullScreen: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    modalClass() {
      return this.isFullScreen
        ? 'fixed top-16 left-0 w-full h-[calc(100vh-4rem)] bg-white rounded-lg shadow-lg p-6 overflow-y-auto'
        : 'bg-white rounded-lg shadow-lg w-full max-w-lg p-6 overflow-y-auto';
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
.comments-container {
  max-height: 400px; /* Adjust as needed */
  overflow-y: auto;
}
</style>

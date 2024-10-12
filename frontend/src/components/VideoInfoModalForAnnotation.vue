<template>
  <div 
    v-if="visible" 
    class="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 " 
    @click="closeModal"
  >
    <div 
      :class="modalClass" 
      @click.stop
    >
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-semibold">{{ item.title }}</h2>
        <button 
          class="text-gray-500 hover:text-red-600 text-2xl font-bold" 
          @click="closeModal"
        >&times;</button>
      </div>
      <div class="text-gray-700">
        <p class="text-blue-500">titre: <span class="text-black">{{ item.titre_video }}</span></p>
        <p class="text-blue-500">Date de publication: <span class="text-black">{{ item.date_publication }}</span></p>
        <p class="text-blue-500">Lien: <span class="text-black"><a :href="item.link" class="text-blue-600">{{ item.lien_video }}</a></span></p>
        <p class="text-blue-500">description: <span class="text-black">{{ item.description_video }}</span></p>
        <p class="text-blue-500">hashtags: <span class="text-black">{{ formattedHashtags }}</span></p>

        <div class="flex justify-between items-center">
          <div class="flex space-x-4">
            <p class="text-blue-500">Nombre de commentaires: <span class="text-black">{{ item.commentaires ? item.commentaires.length : 0 }}</span></p>
            <button 
              @click.stop="showComments" 
              class="text-blue-500 underline hover:text-blue-700"
            >
              Afficher les commentaire
            </button>
          </div>
          <button 
            @click="deleteVideo(item.id_video)" 
            class="text-red-500 underline hover:text-red-700"
          >
            Supprimer la vidéo
          </button>
        </div>
      </div>
      <CommentModal 
        :visible="isCommentModalVisible" 
        :commentaires="item.commentaires" 
        :isFullScreen="true" 
        @close="closeComments" 
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import CommentModal from './CommentModalForAnnotation.vue';

export default {
  name: 'VideoInfoModal',
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    item: {
      type: Object,
      required: true
    },
    isFullScreen: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isCommentModalVisible: false
    };
  },
  methods: {
  closeModal() {
    this.$emit('close');
  },
  showComments() {
    this.isCommentModalVisible = true;
  },
  closeComments() {
    this.isCommentModalVisible = false;
  },
  deleteVideo(videoId) {
    if (confirm("Are you sure you want to delete this video?")) {
      const apiUrl = "http://localhost:8080";
      axios.delete(`${apiUrl}/validation/videos/delete/`, {
        data: { id_video: videoId }
      })
      .then(() => {
        this.closeModal();
        window.location.reload();  // Refresh the page after deletion
      })
      .catch(error => {
        console.error('Error deleting video:', error);
      });
    }
  }
}
,
  computed: {
    formattedHashtags() {
      return this.item.hashtags.join(', ');
    },
    modalClass() {
      return this.isFullScreen 
      ? 'fixed top-16 left-0 w-full h-[calc(100vh-4rem)] rounded-[24px] shadow-lg p-6 overflow-y-auto border-2 bg-white border-[#2180DE]' 
      : 'bg-white rounded-[24px] shadow-lg w-full max-w-3xl p-6 max-h-[80vh] overflow-y-auto';
  }
  },
  components: {
    CommentModal
  }
};
</script>

<style scoped>
/* Additional scoped styles if needed */
</style>

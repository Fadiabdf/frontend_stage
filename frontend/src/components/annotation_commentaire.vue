<template>
  <div class="container mx-auto p-4">
    <div class="flex justify-between items-center">
    <h1 class="text-2xl font-semibold mb-4 text-[#2180DE]">Choisissez un Corpus</h1>
    <button 
      v-if="!filterCompleted"
      class="bg-white-clr  text-black-clr border-2 border-black-clr rounded-full px-4 py-2 hover:bg-gray-300 disabled:opacity-50" 
      @click="handleFilter"
  >
      Pré-Nettoyage
  </button>
  <span v-if="filterCompleted" class="ml-4 font-bold text-blue-clr">Filtrage terminé</span>
</div>
    <!-- Corpus Dropdown -->
    <div class="mb-4">
      <label class="block text-gray-700">Corpus</label>
      <select v-model="selectedCorpus" @change="fetchVideos" class="border rounded px-2 py-1 w-full bg-[#FBFBF3]">
        <option v-for="corpus in corpusList" :key="corpus.id" :value="corpus.id">
          {{ corpus.title }}
        </option>
      </select>
    </div>

    <h1 class="text-2xl font-semibold mb-4 text-[#2180DE]" v-if="selectedCorpus">La liste des vidéos</h1>
    <div v-if="filteredVideos.length" class="grid grid-cols-1 gap-4">
      <div v-for="video in filteredVideos" :key="video.id_video" class="p-4 border-2 border-[#2180DE] rounded-[24px] shadow relative">
        <p class="text-gray-700"><span class="text-[#2180DE]">Titre :</span> {{ video.titre_video }}</p>
        <p class="text-sm text-gray-500"><span class="text-[#2180DE]">Date de publication:</span> {{ formatDate(video.date_publication) }}</p>
        <p class="text-gray-700"><span class="text-[#2180DE]">Description:</span> {{ video.description_video }}</p>
        <button @click="openVideoDetails(video)" class="text-blue-500 underline hover:text-blue-700 mt-2">Plus de détails</button>
      </div>
    </div>
    <div v-else class="text-center text-gray-500">Aucune vidéo disponible pour ce corpus</div>

    <!-- Video Details Modal -->
    <VideoInfoModal 
      :visible="isVideoInfoModalVisible" 
      :item="selectedVideo"
      @close="closeVideoDetails"
    />

    <!-- Comment Modal -->
    <CommentModal 
      :visible="isCommentModalVisible" 
      :commentaires="selectedComments"
      @close="closeCommentModal"
    />
  </div>
</template>
<script>
import axios from 'axios';
import VideoInfoModal from '../components/VideoInfoModalForAnnotation.vue';
import CommentModal from '../components/CommentModalForAnnotation.vue';

export default {
  components: {
    VideoInfoModal,
    CommentModal
  },
  data() {
    return {
      corpusList: [], // List of corpora
      selectedCorpus: '', // Selected corpus ID
      filteredVideos: [], // Videos filtered by selected corpus
      isVideoInfoModalVisible: false,
      isCommentModalVisible: false,
      selectedVideo: null,
      selectedComments: [],
      filterCompleted: false
    };
  },
  methods: {
    async fetchVideos() {
      if (!this.selectedCorpus) return;
      const apiUrl = "http://localhost:8080";
      try {
        
        const response = await axios.get(`${apiUrl}/validation/get_videos_by_corpus/`, {
          params: { corpus_id: this.selectedCorpus }
        });
        this.filteredVideos = response.data;  // Update the list of videos
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    },
    fetchCorpora() {
      const apiUrl = "http://localhost:8080";
      axios.get(`${apiUrl}/validation/corpus/`)
        .then(response => {
          this.corpusList = response.data;
          console.log("Corpora List:", this.corpusList);
        })
        .catch(error => {
          console.error('Error fetching corpus list:', error);
        });
    },
    formatDate(date) {
      // Format the date as DD MM YYYY
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString('fr-FR', options);
    },
    openVideoDetails(video) {
      this.selectedVideo = video;
      this.isVideoInfoModalVisible = true;
    },
    closeVideoDetails() {
      this.isVideoInfoModalVisible = false;
      this.selectedVideo = null;
    },
    openCommentModal(comments) {
      this.selectedComments = comments;
      this.isCommentModalVisible = true;
    },
    closeCommentModal() {
      this.isCommentModalVisible = false;
      this.selectedComments = [];
    },
    async handleFilter() {
      const apiUrl = "http://localhost:8080";
      try {
        const response = await axios.post(`${apiUrl}/validation/base_clean_text/`);
        console.log('Response:', response.data);
        this.filterCompleted = true; 
      } catch (error) {
        console.error('Error pre-cleaning text:', error);
      }
    }
 },
 created() {
    this.fetchCorpora();
   },
};
</script>
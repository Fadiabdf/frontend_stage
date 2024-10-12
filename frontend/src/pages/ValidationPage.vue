<template>
  <div>
    <NavBarComponent />
    <div class="flex justify-between items-center p-4 bg-transparent font-optiauvant">
      <h1 class="text-xl font-optiauvant">Résultats du scraping</h1>
        <button 
          class="bg-white text-black border-2 border-black rounded-full px-4 py-2 hover:bg-gray-300 disabled:opacity-50" 
          @click="addVideosToDatabase"
          :disabled="selectedVideos.length === 0"
        >
          Valider
        </button>
    </div>
    <div class="p-4">
      <ListItem 
        v-for="video in videoList" 
        :key="video.id" 
        :item="video"
        :isSelected="isSelected(video)"
        @toggle="toggleVideoSelection" 
      />
    </div>

    <!-- Corpus Selection Modal -->
    <div v-if="showCorpusSelection" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div class="bg-[#FBFBF3] p-8 shadow-lg max-w-lg w-full border-2 border-black rounded-3xl">
        <h3 class="text-xl font-semibold mb-4 text-center">Choisir un corpus</h3>
        <hr class="border-gray-400 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700">Corpus</label>
          <select v-model="selectedCorpus" class="border rounded px-2 py-1 w-full bg-[#FBFBF3]">
            <option disabled value="">Sélectionnez un corpus</option>
            <option v-for="corpus in corpusList" :key="corpus.id" :value="corpus.id">
              {{ corpus.title || 'Untitled Corpus' }} <!-- Fallback if title is empty -->
            </option>
          </select>
        </div>
        <div class="flex justify-center">
          <button @click="confirmCorpusSelection" class="bg-[#FBFBF3] border-2 border-black text-black px-8 py-1 text-lg focus:outline-none focus:ring-0 rounded-2xl">Confirmer</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NavBarComponent from '@/components/NavBarComponent.vue';
import ListItem from '../components/ListItem.vue';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export default {
  name: 'ValidationPage',
  components: {
    NavBarComponent,
    ListItem
  },
  data() {
    return {
      videoList: [],
      selectedVideos: [],
      showCorpusSelection: false,
      corpusList: [],
      selectedCorpus: null,
    };
  },
  created() {
    this.fetchVideos();
    this.fetchCorpusList();
  },
  methods: {
    fetchVideos() {
      const apiUrl = "http://localhost:8080";
      axios.get(`${apiUrl}/validation/`)
        .then(response => {
          if (Array.isArray(response.data)) {
            this.videoList = response.data.map(video => ({
              ...video,
              id: uuidv4()  // Assign a unique ID
            }));
          } else {
            this.videoList = [{
              ...response.data,
              id: uuidv4()  // Assign a unique ID
            }];
          }
        })
        .catch(error => {
          console.error('Error fetching videos:', error);
        });
    },
    fetchCorpusList() {
      const apiUrl = "http://localhost:8080";
      axios.get(`${apiUrl}/validation/corpus/`,{ timeout: 60000 })
        .then(response => {
          if (Array.isArray(response.data)) {
            this.corpusList = response.data;
          } else {
            console.error('Unexpected corpus list format:', response.data);
          }
        })
        .catch(error => {
          console.error('Error fetching corpus list:', error);
        });
    },
    toggleVideoSelection(video) {
      const index = this.selectedVideos.findIndex(selectedVideo => selectedVideo.id === video.id);
      if (index !== -1) {
        this.selectedVideos.splice(index, 1);
      } else {
        this.selectedVideos.push(video);
      }
    },
    isSelected(video) {
      return this.selectedVideos.some(selectedVideo => selectedVideo.id === video.id);
    },
    addVideosToDatabase() {
      const selectedVideoData = this.selectedVideos.map(video => ({
        id_video: video.id,
        titre_video: video.titre_video,
        description_video: video.description_video,
        hashtags: video.hashtags,
        date_publication: video.date_publication,
        lien_video: video.lien_video,
        commentaires: video.commentaires,
        corpus: video.corpus // Ensure corpus is included
      }));
      const apiUrl = "http://localhost:8080";
      axios.post(`${apiUrl}/validation/submit_validation/`, {
        action: 'validate',
        video_data: JSON.stringify(selectedVideoData),
      })
      .then(response => {
        console.log('Videos added successfully:', response.data);
        this.showCorpusSelection = true; // Show the modal to update corpus
      })
      .catch(error => {
        console.error('Error adding videos to database:', error);
      });
    },
    confirmCorpusSelection() {
      if (this.selectedCorpus) {
        this.selectedVideos.forEach(video => {
          this.updateVideoCorpus(video.id, this.selectedCorpus);
        });
        this.showCorpusSelection = false; // Close the modal
        this.selectedVideos = []; // Clear the selected videos
      } else {
        alert('Please select a corpus.');
      }
    },
    updateVideoCorpus(videoId, corpusId) {
      const selectedVideoData = {
        id_video: videoId,
        corpus: corpusId,
      };
      const apiUrl = "http://localhost:8080";
      axios.put(`${apiUrl}/validation/update_corpus/${corpusId}/`, selectedVideoData)
        .then(response => {
          console.log('Video corpus updated successfully:', response.data);
        })
        .catch(error => {
          console.error('Error updating video corpus:', error);
        });
    }
  }
};
</script>

<template>
       
    <div class="results-page w-full h-screen relative bg-transparent">
     <div> <NavBarComponent /></div>
      <div class="absolute top-[20%] left-1/2 transform -translate-x-1/2">
       
       
        <p class="absolute top-[30%] left-1/2 transform -translate-x-1/2 text-center">
             {{ userQuery }}
        </p>
      </div>
      <div class="h-8 absolute top-[32%] w-[95vw] left-1/2 transform -translate-x-1/2 flex items-center">
        <p class="font-abeezee text-xl text-black">Sélectionner les vidéos à scrapper</p>
        <button @click="handleClick" class="boutton font-abeezee ml-auto">Scrapper</button>
      </div>
      
      <div class="results absolute top-[42%] text-black w-[95vw] left-1/2 transform -translate-x-1/2 flex items-center flex-1 overflow-y-auto flex-col">
        <VideoCard
          v-for="video in videos"
          :key="video.id"
          :video="video"
          :formatDate="formatDate"
          :isSelected="selectedVideos.includes(video)"
          @toggle-selection="toggleSelection"
          class="mb-4"
  />
  
      </div>
    </div>
  </template>
  
  <script>
  import { computed, ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
   
  import VideoCard from '@/components/ResultCadre.vue';
  import NavBarComponent from '../components/NavBarComponent.vue';
  
  export default {
    name: 'ResultatsRecherche',
    components: {
       
      VideoCard,
      
      NavBarComponent
    },
    setup() {
      const route = useRoute();
      const router = useRouter();
      const userQuery = computed(() => route.query.term || '');
      const videos = ref([]);
      const selectedVideos = ref([]);
  
      onMounted(() => {
        const results = localStorage.getItem('searchResults');
        if (results) {
          try {
            videos.value = JSON.parse(results);
            console.log('Loaded videos:', videos.value);
          } catch (error) {
            console.error('Failed to parse results from local storage:', error);
          }
        } else {
          console.warn('No results found in local storage');
        }
      });
  
      function handleSearch(query) {
        router.push({ path: '/recherche', query: { term: query } });
      }
  
      async function handleClick() {
        // Send selected videos to the backend
        const selectedVideoUrls = selectedVideos.value.map(video => video.url);
        console.log('Selected video URLs:', selectedVideoUrls);
  
        try {
          const response = await fetch('http://localhost:8000/validation/scrape/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ urls: selectedVideoUrls })
          });
  
          if (response.ok) {
            const data = await response.json();
            console.log('Scraping result:', data);
            localStorage.setItem('scrapeResults', JSON.stringify(data));
            router.push('/ValidationPage');
          } else {
            console.error('Failed to scrape videos');
          }
        } catch (error) {
          console.error('Error while scraping videos:', error);
        }
      }
  
      function toggleSelection(video) {
    const index = selectedVideos.value.indexOf(video);
    if (index > -1) {
      selectedVideos.value.splice(index, 1); // Deselect video
      console.log(`Deselecting video ID: ${video.id}`);
    } else {
      selectedVideos.value.push(video); // Select video
      console.log(`Selecting video ID: ${video.id}`);
    }
    console.log('Currently selected videos:', selectedVideos.value.map(v => v.id));
  }
  
  
  
      function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      }
  
      return {
        userQuery,
        videos,
        handleSearch,
        handleClick,
        toggleSelection,
        formatDate,
        selectedVideos
      };
    }
  };
  </script>
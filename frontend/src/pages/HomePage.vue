<template>
  <div class="home-page w-full h-screen relative bg-transparent">
    <!-- Ensure the navbar is at the top and not affected by other styles -->
    <div class="relative z-10">
      <NavBarComponent />
    </div>
    <div class="ellipse mt-16"> <!-- Added margin to push ellipse down -->
      <!-- Ellipse content here -->
    </div>
    <SearchBar v-model:query="query" @search="handleSearch" class="absolute top-[35%] left-1/2 transform -translate-x-1/2" />
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from '../axios';
import SearchBar from '../components/SearchBar.vue';
import NavBarComponent from '../components/NavBarComponent.vue'; // Import the NavBarComponent
import { useRouter } from 'vue-router';

export default {
  name: 'HomePage',
  components: {
    SearchBar,
    NavBarComponent, // Register the NavBarComponent
  },
  setup() {
    const query = ref('');
    const router = useRouter();

    const handleSearch = async (searchQuery) => {
      try {
        const apiUrl = process.env.VUE_APP_API_URL;
        const response = await axios.post(`${apiUrl}/validation/search/`, {
          keyword: searchQuery,
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const formattedVideos = response.data.videos.map(video => ({
          id: video.id.videoId,
          title: video.snippet.title,
          description: video.snippet.description,
          url: `https://www.youtube.com/watch?v=${video.id.videoId}`,
          publishingDate: video.snippet.publishedAt,
        }));

        localStorage.setItem('searchResults', JSON.stringify(formattedVideos));

        router.push({
          path: '/recherche',
          query: { term: searchQuery },
        });

      } catch (error) {
        console.error('Error during search:', error.response ? error.response.data : error.message);
      }
    };

    return {
      query,
      handleSearch,
    };
  },
};
</script>

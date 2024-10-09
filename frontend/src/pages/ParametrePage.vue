<template>
  <div class="flex flex-col h-screen">
    <!-- Navbar with blue line below -->
    <div class="bg-white text-blue-600">
      <NavBarComponent />
      <div class="border-b-2 border-[#2180DE] "></div> <!-- Blue line below navbar -->
    </div>

    <div class="flex flex-1">
      <!-- Sidebar -->
      <SidebarComponent class="w-1/4 h-full" />

      <!-- Main content -->
      <div class="flex-1 bg-white">
        <EtiquettesComponent />
      </div>
    </div>
  </div>
</template>

<script>
import NavBarComponent from '../components/NavBarParaPage.vue';
import EtiquettesComponent from '../components/EtiquettesComponent.vue';
import SidebarComponent from '../components/SidebarComponent.vue';

export default {
  name: 'ParametrePage',
  components: {
    NavBarComponent,
    EtiquettesComponent,
    SidebarComponent,
  },
  data() {
    return {
      emotions: [],
      newEmotion: { id: null, name: '', color: '#000000' }
    };
  },
  methods: {
    fetchEmotions() {
      fetch('http://127.0.0.1:8000/validation/emotions/')
        .then(response => response.json())
        .then(data => {
          this.emotions = data;
        });
    },
    addEmotion() {
      fetch('http://127.0.0.1:8000/validation/emotions/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.newEmotion)
      }).then(() => {
        this.fetchEmotions();
        this.resetNewEmotion();
      });
    },
    updateEmotion() {
      fetch('http://127.0.0.1:8000/validation/emotions/', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.newEmotion)
      }).then(() => {
        this.fetchEmotions();
        this.resetNewEmotion();
      });
    },
    deleteEmotion(emotionId) {
      fetch('http://127.0.0.1:8000/validation/emotions/', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: emotionId })
      }).then(() => this.fetchEmotions());
    },
    editEmotion(emotion) {
      this.newEmotion = { ...emotion };
    },
    resetNewEmotion() {
      this.newEmotion = { id: null, name: '', color: '#000000' };
    }
  },
  created() {
    this.fetchEmotions();
  }
};
</script>

<style scoped>
/* Optional scoped styles here */
</style>

<template>
  <div 
    :class="['border p-4 rounded-[22px] border-[#2180DE] mb-4 shadow-sm flex items-start cursor-pointer', isSelected ? 'bg-[#80D4FF] text-white' : 'bg-white text-black']"
    @click="toggleSelection"
  >
    <div class="flex-1">
      <p class="text-ellipsis overflow-hidden line-clamp-2 text-blue-500">titre video: <span class="text-black">{{ item.titre_video }}</span></p>
      <p class="text-ellipsis overflow-hidden line-clamp-2 text-blue-500">description video: <span class="text-black">{{ item.description_video }}</span></p>
      <p class="text-blue-500">hashtags: <span class="text-black">{{ formattedHashtags }}</span></p>
      <button @click.stop="showDetails" class="mt-4 text-blue-500 underline hover:text-blue-700">
        Plus de détails
      </button>
    </div>
    <VideoInfoModal :visible="isVideoInfoModalVisible" :item="item" :isFullScreen="true" @close="closeDetails" />
  </div>
</template>

<script>
import VideoInfoModal from './VideoInfoModal.vue';

export default {
  name: 'ListItem',
  props: {
    item: {
      type: Object,
      required: true
    },
    isSelected: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      isVideoInfoModalVisible: false
    };
  },
  computed: {
    formattedHashtags() {
      return this.item.hashtags.join(', ');
    }
  },
  methods: {
    toggleSelection() {
      this.$emit('toggle', this.item);
    },
    showDetails() {
      this.isVideoInfoModalVisible = true;
    },
    closeDetails() {
      this.isVideoInfoModalVisible = false;
    }
  },
  components: {
    VideoInfoModal
  }
};
</script>

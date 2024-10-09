<template>
    <div 
      class="resultats-cadre cursor-pointer"
      :class="{ 'bg-[#80D4FF]': isSelected, 'bg-[#FBFBF3]': !isSelected }"
      @click="toggleSelection"
    >
      <a :href="video.url" target="_blank" class="text-[#2180DE] underline text-[16px] font-abeezee mb-2">
        {{ video.title }}
      </a>
      <p class="text-black text-[12px] font-abeezee mb-2">{{ getDescriptionPreview(video.description) }}</p>
      <p class="text-gray-600 text-sm mt-2">Publié le: {{ formatDate(video.publishingDate) }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'VideoCard',
    props: {
      video: {
        type: Object,
        required: true,
        validator: (value) => {
          return (
            value.snippet &&
            value.snippet.title &&
            value.snippet.description &&
            value.id &&
            value.id.videoId &&
            value.snippet.publishedAt
          );
        }
      },
      formatDate: {
        type: Function,
        required: true
      },
      isSelected: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      getDescriptionPreview(description) {
        if (!description) return ''; // Return an empty string if description is undefined
        // Return a preview of the description
        return description.split('\n').slice(0, 4).join('\n');
      },
      toggleSelection() {
        console.log(`VideoCard: Toggling selection for video ID: ${this.video.id.videoId}`);
        // Emit an event to notify the parent about the selection state change
        this.$emit('toggle-selection', this.video);
      }
    }
  };
  </script>
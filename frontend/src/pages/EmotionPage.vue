<template>
  <div :style="{ backgroundColor: 'rgba(33, 128, 222, 0.75)' }" class="min-h-screen">
    <NavBarComponent />
    <AnnotationEmotion/>
  </div>
</template>

<script>
import NavBarComponent from '../components/NavBarComponent.vue';
import AnnotationEmotion from '../components/AnnotationEmotion.vue';

export default {
  name: 'EmotionPage',
  components: {
    NavBarComponent,
    AnnotationEmotion
  }
};
</script>

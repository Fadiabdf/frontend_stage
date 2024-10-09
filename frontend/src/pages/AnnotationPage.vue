<template>
    <div class="bg-white">
      <NavBarComponent />
      <annotation_commentaire/>
    </div>
  </template>
  
  <script>
  import NavBarComponent from '../components/NavBarComponent.vue';
  import annotation_commentaire from '../components/annotation_commentaire.vue';
  
  export default {
    name: 'AnnotationPage',
    components: {
      NavBarComponent,
      annotation_commentaire
    }
  };
  </script>
  
  <style scoped>
  /* Add any custom styles for AnnotationPage here */
  </style>
  
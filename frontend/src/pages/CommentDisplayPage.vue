<template>
    <div class=" bg-[#80D4FF] ">
      <NavBarComponent />
      <CommentListComponent/>
       
    </div>
  </template>
  
  <script>
  import NavBarComponent from '../components/NavBarComponent.vue';
  import CommentListComponent from '../components/CommentListComponent.vue';
 
  
  export default {
    name: 'CommentDisplayPage',
    components: {
      NavBarComponent,
      CommentListComponent,
     
    },
     
    
  };
  </script>
   
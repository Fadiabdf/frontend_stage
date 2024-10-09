<template>
    <div class="search-bar relative flex items-center">
      <input
        type="text"
        :value="query"
        @input="$emit('update:query', $event.target.value)"
        placeholder="recherche par mots cle ..."
        class="px-3 bg-transparent outline-none text-black h-full"
        @keyup.enter="search"
      />
      <div class="bar absolute right-12"></div>
      <img
        src="@/assets/loupe.png"
        alt="Search"
        class="w-6 h-6 absolute right-4 cursor-pointer"
        @click="search"
      />
    </div>
  </template>
  
  <script>
  export default {
    name: 'SearchBar',
    props: {
      query: {
        type: String,
        default: ''
      }
    },
    methods: {
      search() {
        this.$emit('search', this.query);
      }
    }
  };
  </script>
  
  <style scoped>
  
  </style>
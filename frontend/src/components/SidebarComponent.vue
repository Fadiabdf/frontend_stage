<template>
  <div class="h-screen w-64 bg-[#80D4FF] p-4">
    <h2 class="text-xl font-bold text-white mb-4">Parametres</h2>
    <router-link to="/Parametre">
    <button class="w-full bg-[#62cbff] hover:bg-[#53C5FF] text-white py-2 px-4 rounded-[12px] text-lg mb-4">
      Modifier les étiquettes
    </button>
  </router-link>
    <router-link to="/ParametreCorpus">
      <button class="w-full bg-[#62cbff] hover:bg-[#53C5FF] text-white py-2 px-4 rounded-[12px] text-lg">
       Gestion des corpus 
      </button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "SidebarComponent",
};
</script>

<style scoped>
</style>

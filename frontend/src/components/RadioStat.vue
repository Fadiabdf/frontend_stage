<template>
  <div>
    <h2 class="text-lg font-medium text-gray-700 mb-2">Choisissez une statistique :</h2>
    <div class="flex items-center space-x-6">
      <label class="inline-flex items-center">
        <input type="radio" class="form-radio" name="statOption" value="info-mutuelle" v-model="selectedOption">
        <span class="ml-2">Information Mutuelle</span>
      </label>
      <label class="inline-flex items-center">
        <input type="radio" class="form-radio" name="statOption" value="khi2" v-model="selectedOption">
        <span class="ml-2">Khi2</span>
      </label>
    </div>
    <p class="mt-4">Option sélectionnée : <strong>{{ selectedOption }}</strong></p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedOption: '', 
    };
  },
};
</script>

<style scoped>

</style>

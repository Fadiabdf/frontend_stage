<template>
  <div
    v-if="visible"
    class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
    @click="closeModal"
  >
    <div
      class="bg-white rounded-lg shadow-lg w-full max-w-4xl p-6 relative"
      @click.stop
      style="max-height: 80vh; overflow-y: auto;"
    >
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-normal text-blue-500">Annoter Commentaire</h2>
        <button
          class="text-gray-500 hover:text-red-600 text-2xl font-bold"
          @click="closeModal"
        >
          &times;
        </button>
      </div>

      <!-- Iterate through all categories and display their corresponding etiquettes -->
      <div v-for="category in categories" :key="category.id" class="mb-6">
        <h3 class="text-lg font-semibold mb-2">{{ category.name }}</h3>

        <!-- Display etiquettes for each category -->
        <div v-for="emotion in getCategoryEmotions(category.id)" :key="emotion.id" class="mb-2">
          <label class="inline-flex items-center">
            <input
              :type="category.multiple_choice ? 'checkbox' : 'radio'"
              :value="emotion.id"
              :checked="isChecked(emotion.id, category.id)"
              @change="handleSelectionChange(emotion.id, category.id)"
              class="form-checkbox"
            />
            <span class="ml-2">{{ emotion.name }}</span>
          </label>
        </div>
      </div>

      <!-- Submit button -->
      <button
        @click="submitAnnotation"
        class="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Valider
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    categories: {
      type: Array,
      required: true
    },
    selectedComment: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      selectedEtiquettesPerCategory: {}, // Store selected etiquettes by category
      allEmotions: [] // Store all emotions
    };
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    fetchEmotions() {
      const apiUrl = "http://localhost:8080";
      axios.get(`${apiUrl}/validation/emotions/`)
        .then(response => {
          this.allEmotions = response.data;
        })
        .catch(error => {
          console.error('Error fetching emotions:', error);
        });
    },
    getCategoryEmotions(categoryId) {
      // Filter emotions based on the selected category
      return this.allEmotions.filter(emotion => emotion.category === categoryId);
    },
    isChecked(emotionId, categoryId) {
      // Return true if the emotionId is selected for the category
      const selected = this.selectedEtiquettesPerCategory[categoryId] || [];
      return selected.includes(emotionId);
    },
    handleSelectionChange(emotionId, categoryId) {
      // Initialize category selection if not already done
      if (!Array.isArray(this.selectedEtiquettesPerCategory[categoryId])) {
        this.selectedEtiquettesPerCategory[categoryId] = [];
      }
      const categorySelections = this.selectedEtiquettesPerCategory[categoryId];

      if (this.categories.find(cat => cat.id === categoryId).multiple_choice) {
        // For checkboxes (multiple choice), add or remove the selection
        if (categorySelections.includes(emotionId)) {
          this.selectedEtiquettesPerCategory[categoryId] = categorySelections.filter(id => id !== emotionId);
        } else {
          this.selectedEtiquettesPerCategory[categoryId] = [...categorySelections, emotionId];
        }
      } else {
        // For radio buttons (single choice), replace the selection
        this.selectedEtiquettesPerCategory[categoryId] = [emotionId];
      }
    },
    submitAnnotation() {
      // Combine selected etiquettes from all categories
      let allSelectedEtiquettes = [];
      for (let categoryId in this.selectedEtiquettesPerCategory) {
        allSelectedEtiquettes = allSelectedEtiquettes.concat(this.selectedEtiquettesPerCategory[categoryId]);
      }

      console.log("Selected Etiquettes before sending:", allSelectedEtiquettes);

      // Send selected etiquettes to backend
      const apiUrl = "http://localhost:8080";
      axios.patch(`${apiUrl}/validation/update/`, {
        id_commentaire: this.selectedComment.id_commentaire, // Backend expects id_commentaire
        descripteur: allSelectedEtiquettes // Backend expects descripteur
      })
      .then(response => {
        console.log('Annotation submitted:', response.data);
        this.selectedEtiquettesPerCategory = {}; // Reset selected etiquettes
        this.$emit('update', allSelectedEtiquettes);
        this.closeModal();
      })
      .catch(error => {
        console.error('Error submitting annotation:', error);
      });
    }
  },
  mounted() {
    this.fetchEmotions(); // Fetch emotions when component mounts
  }
};
</script>

<style scoped>
/* Add any specific styles here */
</style>

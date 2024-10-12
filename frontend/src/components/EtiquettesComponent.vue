<template>
  <div class="p-4">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-blue-700 font-bold">Etiquettes</h2>
      <div>
        <button @click="openCategoryModal" class="border border-black rounded-full px-4 py-2 mr-2">Ajouter Catégorie</button>
        <button @click="openModal('add')" class="border border-black rounded-full px-4 py-2">Ajouter Etiquette</button>
      </div>
    </div>

    <div class="overflow-x-auto rounded-2xl">
      <div v-for="category in categories" :key="category.id" class="mb-6">
        <div class="flex justify-between items-center mb-2">
          <h3 class="text-lg font-semibold">{{ category.name }}</h3>
          <button @click="deleteCategory(category.id)" class="bg-red-500 text-white px-4 py-1 rounded">Delete</button>
        </div>
        <table class="min-w-full rounded-t-2xl mb-4">
          <thead class="bg-[#80D4FF]">
            <tr>
              <th class="px-6 py-2 border-b-2 text-left">Etiquettes</th>
              <th class="px-6 py-2 border-b-2 text-left">Couleur</th>
              <th class="px-6 py-2 border-b-2 text-left">Modifier</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="emotion in emotionsByCategory(category.id)" :key="emotion.id">
              <td class="px-6 py-2 border-b">{{ emotion.name }}</td>
              <td class="px-6 py-2 border-b">
                <span :style="{ backgroundColor: emotion.color }" class="inline-block w-4 h-4 rounded-full"></span>
              </td>
              <td class="px-6 py-2 border-b relative">
                <button @click="toggleDropdown(emotion.id)" class="focus:outline-none">
                  &#x2026;
                </button>
                <div v-if="dropdownIndex === emotion.id" class="absolute left-0 mt-2 w-48 bg-[#F2F2EA] shadow-lg border-black border-2 rounded-2xl">
                  <ul class="py-2">
                    <li @click="openModal('edit', emotion)" class="px-4 py-2 cursor-pointer rounded-2xl hover:bg-[#2180DE]">Modifier</li>
                    <li @click="deleteEmotion(emotion.id)" class="px-4 py-2 cursor-pointer rounded-2xl hover:bg-[#2180DE]">Supprimer</li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Emotion Modal -->
    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div class="bg-[#FBFBF3] p-8 shadow-lg max-w-lg w-full border-2 border-black rounded-3xl">
        <h3 class="text-xl font-semibold mb-4 text-center">{{ modalTitle }}</h3>
        <hr class="border-gray-400 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700">Emotion</label>
          <input v-model="newEmotion.name" class="border rounded px-2 py-1 w-full bg-[#FBFBF3] border-transparent focus:border-transparent focus:outline-none focus:ring-transparent" placeholder="Emotion... " />
        </div>
        <div class="mb-4">
          <label for="colorPicker" class="block text-gray-700">Choisir une couleur</label>
          <input
            id="colorPicker"
            type="color"
            v-model="newEmotion.color"
            class="rounded w-full h-10 p-1 border-2 border-transparent bg-[#FBFBF3] focus:border-transparent focus:ring-0"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Catégorie</label>
          <select v-model="newEmotion.categoryId" class="border rounded px-2 py-1 w-full bg-[#FBFBF3]">
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
        </div>
        <div class="flex justify-center">
          <button @click="saveEmotion" class="bg-[#FBFBF3] border-2 border-black text-black px-8 py-1 text-lg focus:outline-none focus:ring-0 rounded-2xl">{{ modalButton }}</button>
        </div>
      </div>
    </div>

    <!-- Category Modal -->
    <div v-if="showCategoryModal" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div class="bg-[#FBFBF3] p-8 shadow-lg max-w-lg w-full border-2 border-black rounded-3xl">
        <h3 class="text-xl font-semibold mb-4 text-center">Nouvelle Catégorie</h3>
        <hr class="border-gray-400 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700">Nom de la Catégorie</label>
          <input v-model="newCategory.name" class="border rounded px-2 py-1 w-full bg-[#FBFBF3] border-transparent focus:border-transparent focus:outline-none focus:ring-transparent" placeholder="Catégorie... " />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Type de Sélection</label>
          <div>
            <label class="inline-flex items-center">
              <input type="radio" v-model="newCategory.multiple_choice" :value="false" class="form-radio" />
              <span class="ml-2">Choix unique</span>
            </label>
            <label class="inline-flex items-center ml-6">
              <input type="radio" v-model="newCategory.multiple_choice" :value="true" class="form-radio" />
              <span class="ml-2">Choix multiple</span>
            </label>
          </div>
        </div>
        <div class="flex justify-center">
          <button @click="saveCategory" class="bg-[#FBFBF3] border-2 border-black text-black px-8 py-1 text-lg focus:outline-none focus:ring-0 rounded-2xl">Ajouter</button>
        </div>
      </div>
    </div>
  </div>
    <!-- Error Message Popup -->
    <div v-if="errorMessage" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div class="bg-white p-6 shadow-lg max-w-lg w-full border-2 border-black rounded-3xl">
        <h3 class="text-lg font-semibold mb-4">{{ errorMessage }}</h3>
        <div class="flex justify-center">
          <button @click="errorMessage = ''" class="bg-[#FBFBF3] border-2 border-black text-black px-8 py-1 text-lg rounded-2xl">Close</button>
        </div>
      </div>
    </div>
   
</template>

<script>
export default {
  name: 'EtiquettesComponent',
  data() {
    return {
      dropdownIndex: null,
      showModal: false,
      showCategoryModal: false,
      emotions: [],
      categories: [],
      newEmotion: { id: null, name: '', color: '#000000', categoryId: null },
      newCategory: { name: '', multiple_choice: false },
      modalTitle: '',
      modalButton: '',
      editIndex: null,
      errorMessage: ''  // Add this property for error messages
    };
  },
  methods: {
    toggleDropdown(id) {
      this.dropdownIndex = this.dropdownIndex === id ? null : id;
    },
    fetchCategories() {
      const apiUrl = "http://localhost:8080";
      fetch(`${apiUrl}/validation/categories/`)
        .then(response => response.json())
        .then(data => {
          console.log("Fetched categories data:", data);
          this.categories = data;
          this.fetchEmotions();  // Fetch emotions after categories
        })
        .catch(error => console.error('Error fetching categories:', error));
    },
    fetchEmotions() {
      const apiUrl = "http://localhost:8080";
      fetch(`${apiUrl}/validation/emotions/`)
        .then(response => response.json())
        .then(data => {
          console.log("Fetched emotions data:", data);
          this.emotions = data;
        })
        .catch(error => console.error('Error fetching emotions:', error));
    },
    openModal(action, emotion = null) {
      if (action === 'add') {
        this.modalTitle = 'Nouvelle étiquette';
        this.modalButton = 'Ajouter';
        this.resetNewEmotion();
      } else if (action === 'edit') {
        this.modalTitle = 'Modifier étiquette';
        this.modalButton = 'Modifier';
        this.newEmotion = { ...emotion, categoryId: emotion.category };
      }
      this.showModal = true;
    },
    openCategoryModal() {
      this.newCategory = { name: '', multiple_choice: false }; // Reset category form
      this.showCategoryModal = true;
    },
    saveCategory() {
      const apiUrl = "http://localhost:8080";
      fetch(`${apiUrl}/validation/categories/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: this.newCategory.name, multiple_choice: this.newCategory.multiple_choice })
      })
      .then(response => response.json())
      .then(() => {
        this.fetchCategories();
        this.showCategoryModal = false;
      })
      .catch(error => console.error('Error saving category:', error));
    },
    deleteCategory(categoryId) {
      if (confirm('Are you sure you want to delete this category?')) {
        const apiUrl = "http://localhost:8080";
        fetch(`${apiUrl}/validation/categories/${categoryId}/`, {
          method: 'DELETE',
        })
        .then(response => {
          if (response.ok) {
            this.fetchCategories();  // Refresh the list of categories after deletion
          } else if (response.status === 400) {
            this.errorMessage = 'Impossible de supprimer la catégorie car elle est utilisée dans un corpus.';
          } else {
            console.error('Failed to delete category:', response.statusText);
          }
        })
        .catch(error => console.error('Error deleting category:', error));
      }
    },
    deleteEmotion(emotionId) {
  if (confirm('Are you sure you want to delete this emotion?')) {
    const apiUrl = "http://localhost:8080";
    fetch(`${apiUrl}/validation/emotions/${emotionId}/`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
    .then(response => {
      if (response.ok) {
        this.fetchEmotions();  // Refresh the list of emotions after deletion
      } else if (response.status === 400) {
        this.errorMessage = 'Suppression impossible, étiquette utilisée.';
      } else {
        console.error('Failed to delete emotion:', response.statusText);
      }
    })
    .catch(error => console.error('Error deleting emotion:', error));
  }
}
,
    saveEmotion() {
      const apiUrl = "http://localhost:8080";
      const url = this.newEmotion.id 
        ? `${apiUrl}/validation/emotions/${this.newEmotion.id}/`
        : `${apiUrl}/validation/emotions/`;
      const method = this.newEmotion.id ? 'PUT' : 'POST';

      fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: this.newEmotion.name,
          color: this.newEmotion.color,
          category: this.newEmotion.categoryId
        })
      })
      .then(response => response.json())
      .then(() => {
        this.fetchEmotions();
        this.showModal = false;
      })
      .catch(error => console.error('Error saving emotion:', error));
    },
    resetNewEmotion() {
      this.newEmotion = { id: null, name: '', color: '#000000', categoryId: null };
    },
    emotionsByCategory(categoryId) {
      return this.emotions.filter(emotion => emotion.category === categoryId);
    }
  },
  mounted() {
    this.fetchCategories();
  }
};
</script>

<style scoped>
/* Add any specific styles you want for your component */
</style>
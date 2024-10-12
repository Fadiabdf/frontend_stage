<template>
  <div class="p-4">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-blue-700 font-bold">Corpus</h2>
      <button @click="openCorpusModal" class="border border-black rounded-full px-4 py-2">Ajouter Corpus</button>
    </div>

    <!-- Corpus List -->
    <div class="overflow-x-auto rounded-2xl mb-4">
      <table class="min-w-full rounded-t-2xl">
        <thead class="bg-[#80D4FF]">
          <tr>
            <th class="px-6 py-2 border-b-2 text-left">Titre</th>
            <th class="px-6 py-2 border-b-2 text-left">Catégories</th>
            <th class="px-6 py-2 border-b-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="corpus in corpusList" :key="corpus.id">
            <td class="px-6 py-2 border-b">{{ corpus.title }}</td>
            <td class="px-6 py-2 border-b">
              <span v-for="categoryId in corpus.categories" :key="categoryId" class="inline-block bg-gray-200 px-2 py-1 rounded mr-2">
                {{ getCategoryName(categoryId) }}
              </span>
            </td>
            <td class="px-6 py-2 border-b">
              <button @click="editCorpus(corpus.id)" class="bg-yellow-500 text-white px-4 py-1 rounded">Edit</button>
              <button @click="deleteCorpus(corpus.id)" class="bg-red-500 text-white px-4 py-1 rounded">Delete</button>
              <button @click="showDescription(corpus.description)" class="bg-blue-500 text-white px-4 py-1 rounded">Voir plus</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Corpus Modal -->
    <div v-if="showCorpusModal" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div class="bg-[#FBFBF3] p-8 shadow-lg max-w-lg w-full border-2 border-black rounded-3xl">
        <h3 class="text-xl font-semibold mb-4 text-center">{{ modalTitle }}</h3>
        <hr class="border-gray-400 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700">Titre du Corpus</label>
          <input v-model="newCorpus.title" class="border rounded px-2 py-1 w-full bg-[#FBFBF3] border-transparent focus:border-transparent focus:outline-none focus:ring-transparent" placeholder="Titre du Corpus" />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Description</label>
          <textarea v-model="newCorpus.description" class="border rounded px-2 py-1 w-full bg-[#FBFBF3] border-transparent focus:border-transparent focus:outline-none focus:ring-transparent" placeholder="Description du Corpus"></textarea>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Catégories</label>
          <div class="flex flex-wrap">
            <div v-for="category in categories" :key="category.id" class="mr-4 mb-2">
              <input type="checkbox" :value="category.id" v-model="newCorpus.categories" class="mr-2" />
              <label>{{ category.name }}</label>
            </div>
          </div>
        </div>
        <div class="flex justify-center">
          <button @click="saveCorpus" class="bg-[#FBFBF3] border-2 border-black text-black px-8 py-1 text-lg focus:outline-none focus:ring-0 rounded-2xl">{{ modalButton }}</button>
        </div>
      </div>
    </div>

    <!-- Description Modal -->
    <div v-if="showDescriptionModal" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div class="bg-white p-6 shadow-lg max-w-lg w-full border-2 border-black rounded-3xl">
        <h3 class="text-xl font-semibold mb-4 text-center">Description du Corpus</h3>
        <p>{{ currentDescription }}</p>
        <div class="flex justify-center mt-4">
          <button @click="closeDescriptionModal" class="bg-gray-500 text-white px-4 py-1 rounded">Fermer</button>
        </div>
      </div>
    </div>

    <!-- Error Popup -->
    <div v-if="showErrorPopup" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div class="bg-red-500 text-white p-4 rounded-2xl shadow-lg">
        <p class="text-center">{{ errorMessage }}</p>
        <div class="flex justify-center mt-4">
          <button @click="closeErrorPopup" class="bg-gray-800 text-white px-4 py-1 rounded">Fermer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CorpusComponent',
  data() {
    return {
      showCorpusModal: false,
      showDescriptionModal: false,
      showErrorPopup: false,  // For error pop-up
      corpusList: [],
      categories: [],
      newCorpus: { title: '', description: '', categories: [] },
      modalTitle: '',
      modalButton: '',
      currentDescription: '',
      errorMessage: ''  // For error message
    };
  },
  methods: {
    async fetchCategories() {
      const apiUrl = "http://localhost:8080";
      fetch(`${apiUrl}/validation/categories/`)
        .then(response => response.json())
        .then(data => {
          console.log("Fetched categories data:", data);
          this.categories = data;
          this.fetchEmotions();  // Ensure emotions are fetched after categories
        })
        .catch(error => console.error('Error fetching categories:', error));
    },
    fetchCorpus() {
      const apiUrl = "http://localhost:8080";
      fetch(`${apiUrl}/validation/corpus/`)
        .then(response => response.json())
        .then(data => {
          this.corpusList = data;
        })
        .catch(error => console.error('Error fetching corpus:', error));
    },
    openCorpusModal() {
      console.log('Opening Corpus Modal');
      this.newCorpus = { title: '', description: '', categories: [] };
      this.modalTitle = 'Ajouter Corpus';
      this.modalButton = 'Ajouter';
      this.showCorpusModal = true;
      console.log('showCorpusModal:', this.showCorpusModal);
    },
    saveCorpus() {
      const apiUrl = "http://localhost:8080";
      const method = this.newCorpus.id ? 'PUT' : 'POST';
      const url = this.newCorpus.id
        ? `${apiUrl}/validation/corpus/${this.newCorpus.id}/`
        : `${apiUrl}/validation/corpus/`;

      const categoryIds = this.newCorpus.categories.map(cat => cat.id ? cat.id : cat);

      const payload = {
        ...this.newCorpus,
        categories: categoryIds
      };

      fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            this.fetchCorpus();
            this.showCorpusModal = false;
          } else {
            console.error('Error saving corpus:', data.error);
          }
        })
        .catch(error => console.error('Error saving corpus:', error));
    },
    editCorpus(corpusId) {
      const corpusToEdit = this.corpusList.find(corpus => corpus.id === corpusId);
      if (corpusToEdit) {
        this.newCorpus = { ...corpusToEdit };
        this.modalTitle = 'Modifier Corpus';
        this.modalButton = 'Modifier';
        this.showCorpusModal = true;
      }
      this.fetchCorpus();
    },
    deleteCorpus(corpusId) {
      const apiUrl = "http://localhost:8080";
      fetch(`${apiUrl}/validation/corpus/${corpusId}/`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      })
      .then(response => {
        if (response.ok) {
          this.fetchCorpus();  // Refresh the list after deletion
        } else {
          this.errorMessage = 'Corpus contient déjà des vidéos. Suppression impossible.';
          this.showErrorPopup = true;
          console.error('Failed to delete corpus:', response.statusText);
        }
      })
      .catch(error => {
        this.errorMessage = 'Erreur lors de la suppression du corpus.';
        this.showErrorPopup = true;
        console.error('Error deleting corpus:', error);
      });
    },
    closeErrorPopup() {
      this.showErrorPopup = false;
      this.errorMessage = '';
    },
    getCategoryName(categoryId) {
      const actualCategoryId = categoryId.id || categoryId;
      console.log('Looking for category ID:', actualCategoryId);
      const category = this.categories.find(cat => cat.id === actualCategoryId);
      console.log('Found category:', category);
      return category ? category.name : 'Unknown';
    },
    showDescription(description) {
      this.currentDescription = description;
      this.showDescriptionModal = true;
    },
    closeDescriptionModal() {
      this.showDescriptionModal = false;
      this.currentDescription = '';
    }
  },
  mounted() {
    this.fetchCategories().then(() => {
      this.fetchCorpus();
    });
  }
};
</script>

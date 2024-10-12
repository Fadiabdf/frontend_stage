<template>
  <div
    v-if="visible"
    class="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50"
    @click="closeModal"
  >
    <div :class="modalClass" @click.stop>
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-normal text-blue-500">Liste des commentaires</h2>
        <button
          class="text-gray-500 hover:text-red-600 text-2xl font-bold"
          @click="closeModal"
        >&times;</button>
      </div>
      <!-- Set the height to full screen and enable scrolling -->
      <div class="comments-container h-screen overflow-y-auto">
        <div
          v-for="(comment, index) in commentaires"
          :key="comment.id_commentaire + '-' + index"
          class="bg-blue-100 border border-blue-300 p-4 mb-4 rounded-[22px]"
        >
          <!-- Your comment content here -->
          <p><strong class="text-blue-500">Utilisateur:</strong> {{ comment.auteur }}</p>
          <p><strong class="text-blue-500">Date de publication:</strong> {{ formatDate(comment.date_publication) }}</p>
          <p><strong class="text-blue-500">Commentaire:</strong> {{ comment.texte }}</p>

          <!-- Descripteur Section -->
          <div v-if="comment.matchedEtiquettes.length">
            <p><strong class="text-blue-500">Descripteurs:</strong></p>
            <ul v-for="(etiquettes, category) in groupByCategory(comment.matchedEtiquettes)" :key="category">
              <li class="mb-2">
                 <span v-for="(etiquette, i) in etiquettes" :key="etiquette.id" :style="{ color: black}">
                  {{ etiquette.name }}<span v-if="i !== etiquettes.length - 1">, </span>
                </span>
              </li>
            </ul>
          </div>
         
          <!-- Annotation, Delete, and Descripteur Buttons -->
          <div class="flex space-x-4">
            <button
              @click="openAnnotationModal(comment)"
              class="text-blue-500 underline hover:text-blue-700 mt-2"
            >Annoter</button>
            <button
              @click="deleteComment(comment.id_commentaire)"
              class="text-red-500 underline hover:text-red-700 mt-2"
            >Supprimer</button>
            <button
              @click="fetchDescripteurDetails"
              class="text-green-500 underline hover:text-green-700 mt-2"
            >Afficher Descripteur</button>
          </div>
        </div>
      </div>

      <!-- Annotation Modal -->
      <AnnotationModal
        :visible="isAnnotationModalVisible"
        :categories="categories"
        :selectedComment="selectedComment"
        @close="closeAnnotationModal"
        @update="updateCommentDescriptor"
      />

      <!-- Descripteur Details Modal -->
      <div v-if="isDescripteurModalVisible" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50" @click="closeDescripteurModal">
        <div class="bg-white rounded-lg shadow-lg w-full max-w-lg p-6" @click.stop>
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-2xl font-normal text-blue-500">Détails du Descripteur</h2>
            <button
              class="text-gray-500 hover:text-red-600 text-2xl font-bold"
              @click="closeDescripteurModal"
            >&times;</button>
          </div>
          <div v-if="descripteurDetails">
            <div v-for="(etiquettes, category) in descripteurDetails" :key="category">
              <h3 class="text-lg font-semibold mb-2">{{ category }}</h3>
              <ul>
                <li v-for="etiquette in etiquettes" :key="etiquette.name" class="mb-2">
                  <span :style="{ color: black }">{{ etiquette.name }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios';
import AnnotationModal from '../components/AnnotationModal.vue';

export default {
  name: 'CommentModal',
  components: { AnnotationModal },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    commentaires: {
      type: Array,
      required: true
    },
    isFullScreen: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isAnnotationModalVisible: false,
      isDescripteurModalVisible: false,
      selectedComment: null,
      categories: [],
      descripteurDetails: null,
      localCommentaires: []
    };
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    openAnnotationModal(comment) {
      this.selectedComment = comment;
      this.fetchCategories();
      this.isAnnotationModalVisible = true;
    },
    closeAnnotationModal() {
      this.isAnnotationModalVisible = false;
      this.selectedComment = null;
    },
    fetchCategories() {
      const apiUrl = "http://localhost:8080";
      axios.get(`${apiUrl}/validation/categories/`)
        .then(response => {
          this.categories = response.data;
        })
        .catch(error => {
          console.error('Error fetching categories:', error);
        });
    },
    updateCommentDescriptor(updatedDescriptor) {
      if (!this.selectedComment || !this.selectedComment.id_commentaire) {
        console.error('Error: selectedComment is not properly set.');
        return;
      }
      const apiUrl = "http://localhost:8080";
      axios.patch(`${apiUrl}/validation/update/`, {
        id_commentaire: this.selectedComment.id_commentaire,
        descripteur: updatedDescriptor
      })
      .then(() => {
        this.$emit('update');
        this.closeAnnotationModal();
      })
      .catch(error => {
        console.error('Error updating comment:', error);
      });
    },
    deleteComment(commentId) {
      if (confirm("Are you sure you want to delete this comment?")) {
        const apiUrl = "http://localhost:8080";
        axios.delete(`${apiUrl}/validation/comments/delete/`, {
          data: { id_commentaire: commentId }
        })
        .then(() => {
          this.$emit('update');
        })
        .catch(error => {
          console.error('Error deleting comment:', error);
        });
      }
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString('fr-FR', options);
    },
    groupByCategory(matchedEtiquettes) {
      return matchedEtiquettes.reduce((grouped, etiquette) => {
        if (!grouped[etiquette.category]) {
          grouped[etiquette.category] = [];
        }
        grouped[etiquette.category].push(etiquette);
        return grouped;
      }, {});
    },
    getCategoryName(categoryId) {
      const category = this.categories.find(cat => cat.id === categoryId);
      return category ? category.title : 'Unknown Category';
    },
    fetchDescripteurDetails() {
      const apiUrl = "http://localhost:8080";
      axios.get(`${apiUrl}/validation/emotions/`)
        .then(response => {
          this.etiquettes = response.data;
          this.compareDescripteurWithEtiquettes();
        })
        .catch(error => {
          console.error('Error fetching etiquettes:', error);
        });
    },
    compareDescripteurWithEtiquettes() {
      this.groupedByCategory = {};

      this.localCommentaires.forEach(comment => {
        comment.matchedEtiquettes = [];

        comment.descripteur.forEach(descripteurId => {
          const matchingEtiquette = this.etiquettes.find(etiquette => etiquette.id === descripteurId);

          if (matchingEtiquette) {
            comment.matchedEtiquettes.push(matchingEtiquette);

            if (!this.groupedByCategory[matchingEtiquette.category]) {
              this.groupedByCategory[matchingEtiquette.category] = [];
            }

            this.groupedByCategory[matchingEtiquette.category].push(matchingEtiquette);
          }
        });
      });

      console.log("grouped", this.groupedByCategory);
    },
    closeDescripteurModal() {
      this.isDescripteurModalVisible = false;
      this.descripteurDetails = null;
    }
  },
  mounted() {
    this.localCommentaires = [...this.commentaires];
    this.fetchDescripteurDetails();
  }
};
</script>
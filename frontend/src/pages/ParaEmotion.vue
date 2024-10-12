<template>
    <div>
      <h3>Emotion List</h3>
      <ul>
        <li v-for="emotion in emotions" :key="emotion.id" :style="{ color: emotion.color }">
          {{ emotion.name }}
        </li>
      </ul>
  
      <h3>Add/Update Emotion</h3>
      <input v-model="newEmotion.name" placeholder="Emotion Name" />
      <input v-model="newEmotion.color" type="color" />
  
      <button @click="addEmotion">Add Emotion</button>
      <button v-if="newEmotion.id" @click="updateEmotion">Update Emotion</button>
  
      <h3>Delete Emotion</h3>
      <select v-model="deleteEmotionId">
        <option v-for="emotion in emotions" :key="emotion.id" :value="emotion.id">
          {{ emotion.name }}
        </option>
      </select>
      <button @click="deleteEmotion">Delete Emotion</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        emotions: [],
        newEmotion: { id: null, name: '', color: '#000000' },
        deleteEmotionId: ''
      };
    },
    methods: {
      fetchEmotions() {
        const apiUrl = "http://localhost:8080";
        fetch(`${apiUrl}/validation/emotions/`)
          .then(response => response.json())
          .then(data => {
            this.emotions = data;
          });
      },
      addEmotion() {
        const apiUrl = "http://localhost:8080";
        fetch(`${apiUrl}/validation/emotions/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.newEmotion)
        }).then(() => this.fetchEmotions());
      },
      updateEmotion() {
        const apiUrl = "http://localhost:8080";
        fetch(`${apiUrl}/validation/emotions/`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.newEmotion)
        }).then(() => {
          this.fetchEmotions();
          this.newEmotion = { id: null, name: '', color: '#000000' };
        });
      },
      deleteEmotion() {
        const apiUrl = "http://localhost:8080";
        fetch(`${apiUrl}/validation/emotions/`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: this.deleteEmotionId })
        }).then(() => this.fetchEmotions());
      }
    },
    created() {
      this.fetchEmotions();
    }
  };
  </script>
  
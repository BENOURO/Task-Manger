<template>
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
    crossorigin="anonymous"
  />
  <Header :showAuthLinks="false" :userType="userType" />
  <div class="task-container">
    <div class="form-card">
      <div class="text-center">
        <img :src="img" class="form-icon" />
        <h2 class="form-title">Create Task</h2>
      </div>
      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label for="title" class="form-label">
            Task Title <span class="text-danger">*</span>
          </label>
          <input
            type="text"
            v-model="FormData.title"
            class="form-control"
            id="title"
            required
          />
        </div>
        <div class="mb-3">
          <label for="desc" class="form-label">
            Description <span class="text-danger">*</span>
          </label>
          <textarea
            v-model="FormData.description"
            class="form-control"
            id="desc"
            rows="3"
            required
          ></textarea>
        </div>
        <div class="mb-3">
          <label for="date" class="form-label">
            Due Date <span class="text-danger">*</span>
          </label>
          <input
            type="date"
            v-model="FormData.date"
            class="form-control"
            id="date"
            required
          />
        </div>
        <div class="mb-3">
          <label for="priority" class="form-label">
            Priority <span class="text-danger">*</span>
          </label>
          <input
            type="text"
            v-model="FormData.priority"
            class="form-control"
            id="priority"
            required
          />
        </div>
        <button type="submit" class="btn btn-warning w-100">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import Header from './Header.vue';

export default {
  components: {
    Header,
  },
  data() {
    return {
      img: require('@/assets/hh.jpeg'),
      FormData: {
        title: '',
        priority: '',
        date: '',
        description: '',
      },
      userType: localStorage.getItem('userType') || ''
    };
  },
  methods: {
    async submitForm() {
      console.log("Submitting form...", this.FormData);

      try {
        const response = await fetch('http://localhost:34/projet/add_task.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.FormData),
        });

        const result = await response.json();
        if (result.success) {
          alert('Task added successfully!');
          this.clearForm();
        } else {
          alert(`Error: ${result.message}`);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while submitting the form.');
      }
    },
    clearForm() {
      this.FormData = {
        title: '',
        priority: '',
        date: '',
        description: '',
      };
    },
  },
};
</script>

<style>
/* Your styles */
</style>
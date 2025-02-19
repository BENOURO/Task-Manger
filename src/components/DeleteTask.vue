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
        <h2 class="form-title">Delete Task</h2>
      </div>
      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label for="title" class="form-label">
            Task Title <span class="text-danger">*</span>
          </label>
          <input
            type="text"
            v-model="title"
            class="form-control"
            id="title"
            required
            name="title"
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
      title: '',
      img: 'https://via.placeholder.com/100', 
      userType: localStorage.getItem('userType') || ''
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await fetch('http://localhost:34/projet/Delete_Task.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title: this.title }),
        });

        const result = await response.json();
        if (result.success) {
          alert('Task deleted successfully!');
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
      this.title = '';
    }
  }
};
</script>

<style>
body {
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), no-repeat center center fixed;
  background-size: cover;
  color: #fff;
  font-family: 'Arial', sans-serif;
}

p {
  color: white;
}

.task-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.form-card {
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 15px;
  padding: 30px;
  width: 100%;
  max-width: 400px;
}

.form-title {
  font-size: 24px;
  color: #f8c146;
  margin-bottom: 20px;
}

.form-label {
  font-weight: bold;
  color: #fff;
}

.form-control {
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: 1px solid #ccc;
}

.form-control:focus {
  background-color: rgba(255, 255, 255, 0.2);
  border-color: #f8c146;
  box-shadow: none;
}

.btn-warning {
  background-color: #f8c146;
  border: none;
  font-weight: bold;
}

.btn-warning:hover {
  background-color: #ffc107;
  color: #000;
}
</style>
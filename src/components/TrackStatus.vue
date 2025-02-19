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
      <form v-if="!taskDetails" @submit.prevent="trackStatus">
        <div class="mb-3">
          <h2 class="form-title">Track Task</h2>
          <label for="title" class="form-label">
            Title <span class="text-danger">*</span>
          </label>
          <input type="text" v-model="title" class="form-control" id="title" required />
        </div>
        <br />
        <button type="submit" class="btn btn-warning w-100">Track Status</button>
      </form>
      <div v-else>
        <h2 class="form-title">Task Details</h2>
        <p><strong>Task Name:</strong> {{ taskDetails.title }}</p>
        <p><strong>User Name:</strong> {{ taskDetails.userName }}</p>
        <p><strong>Due Date:</strong> {{ taskDetails.dueDate }}</p>
        <p><strong>Description:</strong> {{ taskDetails.description }}</p>
        <p><strong>Priority:</strong> {{ taskDetails.priority }}</p>
        <button @click="clearTaskDetails" class="btn btn-warning w-100">Track Another Task</button>
      </div>
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
      taskDetails: null,
      userType: localStorage.getItem('userType') || ''
    };
  },
  methods: {
    async trackStatus() {
      console.log("Tracking status for title:", this.title);

      try {
        const response = await fetch('http://localhost:34/projet/track_status.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title: this.title }),
        });

        const result = await response.json();
        if (result.success) {
          this.taskDetails = result.task;
        } else {
          alert(`Error: ${result.message}`);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while tracking the status.');
      }
    },
    clearTaskDetails() {
      this.taskDetails = null;
      this.title = '';
    },
  },
};
</script>


<style>
body {
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), no-repeat center center fixed;
  background-size: cover;
  color: #fff;
  font-family: 'Arial', sans-serif;
}
p{
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
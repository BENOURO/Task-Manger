<template>
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
    crossorigin="anonymous"
  />
  <Header :showAuthLinks="false" :userType="FormData.userType" />
  <div class="task-container">
    <div class="form-card">
      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <h2 class="form-title">Assign Task</h2>
          <label for="taskName" class="form-label">
            Task Name <span class="text-danger">*</span>
          </label>
          <input
            type="text"
            v-model="FormData.taskName"
            class="form-control"
            id="taskName"
            required
          />
        </div>
        <br />
        <div class="mb-3">
          <label for="userId" class="form-label">
            User Id <span class="text-danger">*</span>
          </label>
          <input
            type="text"
            v-model="FormData.userId"
            class="form-control"
            id="userId"
            required
          />
        </div>
        <br />
        <div class="mb-3">
          <label for="dueDate" class="form-label">
            Due Date <span class="text-danger">*</span>
          </label>
          <input
            type="date"
            v-model="FormData.dueDate"
            class="form-control"
            id="dueDate"
            required
          />
        </div>
        <br />
        <div class="mb-3">
          <label for="description" class="form-label">
            Description <span class="text-danger">*</span>
          </label>
          <textarea
            v-model="FormData.description"
            class="form-control"
            id="description"
            required
          ></textarea>
        </div>
        <br />
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
        <br />
        <button type="submit" class="btn btn-warning w-100">Assign Task</button>
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
      FormData: {
        taskName: '',
        userId: '',
        dueDate: '',
        description: '',
        priority: '',
        userType: localStorage.getItem('userType') || ''
      },
    };
  },
  methods: {
    async submitForm() {
      console.log("Submitting form...", this.FormData);

      try {
        const response = await fetch('http://localhost:34/projet/assign_task.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.FormData),
        });

        const result = await response.json();
        if (result.success) {
          alert('Task assigned successfully!');
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
        taskName: '',
        userId: '',
        dueDate: '',
        description: '',
        priority: '',
        userType: localStorage.getItem('userType') || ''
      };
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
<template>
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
    crossorigin="anonymous"
  >
  <Header :showAuthLinks="false" :userType="userType" />
  <div class="task-container">
    <div class="form-card">
      <form @submit.prevent="setDate">
        <div class="mb-3">
          <h2 class="form-title">Set Date</h2>
          <label for="TaskId1" class="form-label">Task Id <span class="text-danger">*</span></label>
          <input
            type="text"
            class="form-control"
            v-model="taskId"
            id="TaskId1"
          />
        </div>
        <br />
        <div class="mb-3">
          <label for="DueDate" class="form-label">Set Due Date: <span class="text-danger">*</span></label>
          <input
            type="date"
            class="form-control"
            v-model="dueDate"
            id="DueDate"
          />
        </div>
        <br />
        <button type="submit" class="btn btn-warning w-100">Set Due Date</button>
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
      taskId: '',
      dueDate: '',
      userType: localStorage.getItem('userType') || ''
    };
  },
  methods: {
    async setDate() {
      const payload = {
        TaskId: this.taskId,
        DueDate: this.dueDate,
      };

      try {
        const response = await fetch('http://localhost:34/projet/set_Date.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        const result = await response.json();
        console.log(result);

        if (response.ok) {
          alert('Due date updated successfully!');
        } else {
          alert('Failed to update due date.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
      }
    },
  },
};
</script>


<style>
body {
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6));
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

.form-icon {
  width: 50px;
  margin-bottom: 15px;
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
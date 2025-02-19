<template>
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
    crossorigin="anonymous"
  />
  <Header :showAuthLinks="false" :userType="userType" />
  <div class="tasks-container">
    <div class="filter-container">
      <div class="mb-3">
        <label for="priorityFilter" class="form-label">Filter by Priority</label>
        <select v-model="filters.priority" class="form-control" id="priorityFilter">
          <option value="">Select a Priority</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="dueDateFilter" class="form-label">Filter by Due Date</label>
        <input
          type="date"
          v-model="filters.dueDate"
          class="form-control"
          id="dueDateFilter"
        />
      </div>
      <button @click="applyFilters" class="btn btn-warning w-100">Apply Filters</button>
    </div>
    <div class="form-card">
      <div class="text-center">
        <h2 class="form-title">My Tasks</h2>
      </div>
      <ul class="list-group">
        <li v-for="task in filteredTasks" :key="task.id" class="list-group-item">
          <h5>{{ task.title }}</h5>
          <p>{{ task.description }}</p>
          <p><strong>Due Date:</strong> {{ task.dueDate }}</p>
          <p><strong>Priority:</strong> {{ task.priority }}</p>
        </li>
      </ul>
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
      tasks: [],
      filters: {
        priority: '',
        dueDate: ''
      },
      userType: localStorage.getItem('userType') || ''
    };
  },
  created() {
    this.fetchTasks();
  },
  computed: {
    filteredTasks() {
      return this.tasks.filter(task => {
        const matchesPriority = this.filters.priority ? task.priority === this.filters.priority : true;
        const matchesDueDate = this.filters.dueDate ? task.dueDate === this.filters.dueDate : true;
        return matchesPriority && matchesDueDate;
      });
    }
  },
  methods: {
    async fetchTasks() {
      try {
        const response = await fetch('http://localhost:34/projet/get_tasks.php', {
          method: 'GET',
          credentials: 'include',
        });

        const result = await response.json();
        console.log('Fetch result:', result); // Debugging log
        if (result.success) {
          this.tasks = result.tasks;
        } else {
          console.error('Error fetching tasks:', result.message);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    },
    applyFilters() {
      // This method is intentionally left empty as the filtering is handled by the computed property
    }
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

.tasks-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  padding: 20px;
}

div.tasks-container {
  margin-right: 150px;
}

.filter-container {
  margin-right: 30px;
  width: 250px;
  background-color: black;
  padding: 20px;
  border-radius: 10px;
}

.form-card {
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 15px;
  padding: 30px;
  width: 100%;
  max-width: 600px;
}

.form-title {
  font-size: 24px;
  color: #f8c146;
  margin-bottom: 20px;
}

.list-group-item {
  background-color: rgba(255, 255, 255, 0.1);
  color: #000000;
  border: 1px solid #ccc;
}

li.list-group-item {
  background-color: black;
}

.list-group-item h5 {
  color: #f8c146;
}
</style>
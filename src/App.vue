<template>
  <div id="app">
    <nav v-if="showNavBar" class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">Task Manager</router-link>
        <span class="navbar-toggler-icon"></span>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item" v-if="userType === 'Admin'">
              <router-link class="nav-link" to="/CreateTask">Create Task</router-link>
            </li>
            <li class="nav-item" v-if="userType === 'Admin'">
              <router-link class="nav-link" to="/AssignTask">Assign Task</router-link>
            </li>
            <li class="nav-item" v-if="userType === 'Admin'">
              <router-link class="nav-link" to="/setDueDates">Set Due Dates</router-link>
            </li>
            <li class="nav-item" v-if="userType === 'Admin'">
              <router-link class="nav-link" to="/TrackStatus">Track Status</router-link>
            </li>
            <li class="nav-item" v-if="userType === 'Admin'">
              <router-link class="nav-link" to="/DeleteTask">Delete Task</router-link>
            </li>
            <li class="nav-item" v-if="userType === 'User'">
              <router-link class="nav-link" to="/MyTasks">My Tasks</router-link>
            </li>
          </ul>
          <ul class="navbar-nav">
            <li class="nav-item" v-if="!isLoggedIn">
              <router-link class="nav-link" to="/Register">Register</router-link>
            </li>
            <li class="nav-item" v-if="!isLoggedIn">
              <router-link class="nav-link" to="/Login">Login</router-link>
            </li>
            <li class="nav-item" v-if="isLoggedIn">
              <a class="nav-link" href="#" @click="logout">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div v-if="showTasks" class="container mt-4">
      <!-- <h2 class="text-center mb-4">Task Manager</h2> -->
      <div v-if="tasks.length > 0">
        <h3 class="text-center mb-4">All Tasks</h3>
        <ul class="tasks-list list-group">
          <li v-for="task in tasks" :key="task.TaskID" class="task-item list-group-item">
            <h4 class="mb-2">{{ task.title }}</h4>
            <p><strong>Description:</strong> {{ task.description }}</p>
            <p><strong>Due Date:</strong> {{ task.dueDate }}</p>
            <p><strong>Priority:</strong> {{ task.priority }}</p>
          </li>
        </ul>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tasks: [],
      userType: localStorage.getItem('userType') || '', // Retrieve userType from localStorage
      isLoggedIn: localStorage.getItem('isLoggedIn') === 'true', // Retrieve login status from localStorage
    };
  },
  computed: {
    showNavBar() {
      return this.$route.path !== '/Login'; // Show navbar on all pages except Login
    },
    showTasks() {
      return this.$route.path !== '/Login' && this.$route.path !== '/Register' && this.$route.path !== '/CreateTask' && this.$route.path !== '/AssignTask' && this.$route.path !== '/setDueDates' && this.$route.path !== '/TrackStatus' && this.$route.path !== '/DeleteTask';
    }
  },
  
  methods: {
    checkAuth() {
      this.userType = localStorage.getItem('userType') || '';
      this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    },

    logout() {
      localStorage.removeItem('userType');
      localStorage.removeItem('isLoggedIn');
      this.userType = '';
      this.isLoggedIn = false;
      this.$router.push('/Login');
    },
    created() {
    this.checkAuth(); // Ensure auth data is fresh on page load
  },
  watch: {
    '$route'() {
      this.checkAuth(); // Update auth state when route changes
    },
  },
}}
</script>

<style>
body {
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),  no-repeat center center fixed;
  background-size: cover;
  color: #fff;
  font-family: 'Arial', sans-serif;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.navbar {
  padding: 15px;
}

.navbar-brand {
  font-weight: bold;
  color: #f8c146 !important;
}

.nav-link {
  color: #fff !important;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #f8c146 !important;
}

.nav-link.router-link-exact-active {
  color: #f8c146 !important;
}

.navbar-toggler {
  border-color: #f8c146;
}

#navbarNav {
  margin-left: auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: 10px;
}

.nav-item {
  gap: 20px;
  list-style-type: none;
}

ul {
  gap: 40px;
}

ul .navbar-nav {
  margin-right: 200px;
}

.container-fluid {
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-nav {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.nav-item {
  margin-left: 10px;
}

/* Custom styles for the tasks list */
.tasks-list {
  list-style-type: none;
  padding: 0;
  margin: 20px 0;
}

.task-item {
  background-color: rgba(0, 0, 0, 0.8);
  border: 1px solid #dee2e6;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 10px;
  transition: background-color 0.3s ease;
  color: #f8f9fa;
}

.task-item:hover {
  background-color: #495057;
}

.task-item h4 {
  margin: 0 0 10px 0;
  color: #f8c146;
}

.task-item p {
  margin: 5px 0;
  color: #f8f9fa;
}
</style>
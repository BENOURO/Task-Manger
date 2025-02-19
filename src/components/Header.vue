<template>
  <header>
    <nav>
      <ul>
        <li v-if="showAuthLinks"><router-link to="/login">Login</router-link></li>
        <li v-if="showAuthLinks"><router-link to="/register">Register</router-link></li>
        <li v-if="!showAuthLinks && userType === 'admin'"><router-link to="/createTask">Create Task</router-link></li>
        <li v-if="!showAuthLinks && userType === 'admin'"><router-link to="/assignTask">Assign Task</router-link></li>
        <li v-if="!showAuthLinks && userType === 'admin'"><router-link to="/setDueDates">Set Due Dates</router-link></li>
        <li v-if="!showAuthLinks && userType === 'admin'"><router-link to="/deleteTask">Delete Task</router-link></li>
        <li v-if="!showAuthLinks && userType === 'admin'"><router-link to="/trackStatus">Track Status</router-link></li>
        <li v-if="!showAuthLinks"><router-link to="/myTasks">My Tasks</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  props: {
    showAuthLinks: {
      type: Boolean,
      default: true
    },
    userType: {
      type: String,
      default: ''
    }
  }
};
</script>

<style>
header {
  background-color: #333;
  padding: 10px;
}

nav ul {
  list-style-type: none;
  padding: 0;
}

nav ul li {
  display: inline;
  margin-right: 10px;
}

nav ul li a {
  color: #fff;
  text-decoration: none;
}

nav ul li a:hover {
  text-decoration: underline;
}
</style>
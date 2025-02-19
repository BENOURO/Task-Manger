<template>
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
    crossorigin="anonymous"
  />
  <Header :showAuthLinks="!isLoggedIn" :userType="userType" />
  <div class="login-container">
    <div class="form-card">
      <div class="text-center">
        <h2 class="form-title">Login</h2>
      </div>
      <form @submit.prevent="login">
        <div class="mb-3">
          <label for="email" class="form-label">
            Email address <span class="text-danger">*</span>
          </label>
          <input
            type="email"
            v-model="email"
            class="form-control"
            id="email"
            required
            name="email"
          />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">
            Password <span class="text-danger">*</span>
          </label>
          <input
            type="password"
            v-model="password"
            class="form-control"
            id="password"
            required
            name="password"
          />
        </div>
        <button type="submit" class="btn btn-warning w-100">Login</button>
      </form>
      <p v-if="errorMessage" class="text-danger mt-3">{{ errorMessage }}</p>
      <div class="text-center mt-3">
        <p id="yel">Don't have an account? <router-link to="/Register" id="aa">Register here</router-link></p>
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
      email: '',
      password: '',
      errorMessage: '',
      isLoggedIn: false,
      userType: ''
    };
  },
  methods: {
    async login() {
      console.log("Logging in with", this.email, this.password);

      try {
        const response = await fetch('http://localhost:34/projet/Login.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: this.email, password: this.password }),
          credentials: 'include',
        });

        const result = await response.json();
        if (result.success) {
          localStorage.setItem('userType', result.userType);
          localStorage.setItem('isLoggedIn', true);
          this.isLoggedIn = true;
          this.userType = result.userType;
          if (result.userType === 'admin') {
            this.$router.push('/CreateTask'); // Redirect to CreateTask page for admin
          } else {
            this.$router.push({ name: 'MyTasks', params: { tasks: result.tasks } }); // Redirect to MyTasks page with tasks data for regular users
          }
        } else {
          this.errorMessage = result.message;
        }
      } catch (error) {
        console.error('Error:', error);
        this.errorMessage = 'An error occurred while logging in.';
      }
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
#aa{
  color: #f8c146;
}

.login-container {
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

.text-danger {
  color: #dc3545 !important;
}
</style>
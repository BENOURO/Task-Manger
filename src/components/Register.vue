<template>
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
    crossorigin="anonymous"
  />
  
  <div class="register-container">
    <div class="form-card">
      <div class="text-center">
        <h2 class="form-title">Register</h2>
      </div>
      <form @submit.prevent="register">
        <div class="mb-3">
          <label for="name" class="form-label">
            Name <span class="text-danger">*</span>
          </label>
          <input
            type="text"
            v-model="name"
            class="form-control"
            id="name"
            required
            name="name"
          />
        </div>
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
        <button type="submit" class="btn btn-warning w-100">Register</button>
      </form>
      <div class="text-center mt-3">
        <p>Already have an account? <router-link to="/Login" id="aa">Login here</router-link></p>
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
      name: '',
      email: '',
      password: '',
    };
  },
  methods: {
    async register() {
      console.log("Registering with", this.name, this.email, this.password);

      try {
        const response = await fetch('http://localhost:34/projet/Register.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: this.name, email: this.email, password: this.password }),
        });

        const result = await response.json();
        if (result.success) {
          alert('Registration successful!');
          // Redirect to login page or perform other actions
        } else {
          alert(`Error: ${result.message}`);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while registering.');
      }
    },
  },
};
</script>

<style>
body {
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),  no-repeat center center fixed;
  background-size: cover;
  color: #fff;
  font-family: 'Arial', sans-serif;
}
#aa{
  color: #f8c146;
}

.register-container {
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
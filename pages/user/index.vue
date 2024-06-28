<template>
    <div>
      <h1>User Create</h1>
      <div class="vuejs-content">
        <form @submit.prevent="register">
          <div>
            <label for="username">Username</label>
            <input id="username" v-model="name" type="text">
          </div>
          <div>
            <label for="email">Email</label>
            <input id="email" v-model="email" type="email">
          </div>
          <div>
            <label for="password">Password</label>
            <input id="password" v-model="password" type="password">
          </div>
          <button type="submit">Register</button>
        </form>
    
        <div v-if="status" :class="{'success': success, 'error': !success}">
          {{ status }}
        </div>
      </div>
  
      <h2>Bank Users</h2>
      <ul>
        <li v-for="user in users" :key="user.id">
          {{ user.name }} - {{ user.email }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: '',
        email: '',
        password: '',
        status: '',
        success: false,
        users: [] // Data property to store the users
      };
    },
    methods: {
      register() {
        const options = {
          method: 'POST',
          headers: {
            Authorization: 'Bearer xau_VXR7bwVEySeLTMjgHQEEb4kVwXtwrpvv0',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: this.name,
            email: this.email,
            password: this.password
          })
        };
  
        fetch('https://app-developer-s-workspace-6anock.us-east-1.xata.sh/db/database-cloud:main/tables/user/data?columns=id', options)
          .then(response => response.json())
          .then(response => {
            if (response.id) {
              this.status = 'Successfully registered!';
              this.success = true;
              this.fetchUsers(); // Refresh the user list after successful registration
            } else {
              this.status = 'Registration failed. Please try again.';
              this.success = false;
            }
          })
          .catch(err => {
            this.status = 'An error occurred. Please try again.';
            this.success = false;
          });
      },
      fetchUsers() {
        const options = {
          method: 'POST',
          headers: {
            Authorization: 'Bearer xau_VXR7bwVEySeLTMjgHQEEb4kVwXtwrpvv0',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            columns: ["name", "email", "password"],
            page: { size: 15 }
          })
        };
  
        fetch('https://app-developer-s-workspace-6anock.us-east-1.xata.sh/db/database-cloud:main/tables/user/query', options)
          .then(response => response.json())
          .then(response => {
            this.users = response.records; // Assuming the response contains a 'records' field with the user data
          })
          .catch(err => {
            console.error(err);
          });
      }
    },
    mounted() {
      this.fetchUsers(); // Fetch users when the component is mounted
    }
  };
  </script>
  
  <style lang="scss" scoped>
  .success {
    color: green;
  }
  .error {
    color: red;
  }

  .vuejs-container {
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
}
@media (min-width: 576px) {
    .vuejs-container {
        max-width: 540px;
    }
}
@media (min-width: 768px) {
    .vuejs-container {
        max-width: 720px;
    }
}
@media (min-width: 992px) {
    .vuejs-container {
        max-width: 960px;
    }
}
@media (min-width: 1200px) {
    .vuejs-container {
        max-width: 1140px;
    }
}
@media (min-width: 1400px) {
    .vuejs-container {
        max-width: 1320px;
    }
}
  </style>
  
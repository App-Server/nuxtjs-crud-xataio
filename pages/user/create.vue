<template>
    <div>
      <h1>User Create</h1>
  
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
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: '',
        email: '',
        password: '',
        status: '',
        success: false
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
            if (response.id) { // Assuming the response contains an 'id' field on success
              this.status = 'Successfully registered!';
              this.success = true;
            } else {
              this.status = 'Registration failed. Please try again.';
              this.success = false;
            }
          })
          .catch(err => {
            this.status = 'An error occurred. Please try again.';
            this.success = false;
          });
      }
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
  </style>
  
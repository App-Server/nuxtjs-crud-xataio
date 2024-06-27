<template>
    <div>
      <h1>User Create/Edit</h1>
  
      <form @submit.prevent="submitForm">
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
        <button type="submit">{{ isEditing ? 'Update' : 'Register' }}</button>
      </form>
  
      <div v-if="status" :class="{'success': success, 'error': !success}">
        {{ status }}
      </div>
  
      <h2>Bank Users</h2>
      <ul>
        <li v-for="user in users" :key="user.id">
          {{ user.name }} - {{ user.email }}
          <button @click="loadUser(user.id)">Edit</button>
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
        users: [],
        isEditing: false,
        currentUserId: null // To store the ID of the user being edited
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
              this.fetchUsers();
              this.resetForm();
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
            this.users = response.records;
          })
          .catch(err => {
            console.error(err);
          });
      },
      loadUser(userId) {
        const user = this.users.find(user => user.id === userId);
        if (user) {
          this.name = user.name;
          this.email = user.email;
          this.password = user.password; // Assuming the API returns the password
          this.currentUserId = userId;
          this.isEditing = true;
        }
      },
      updateUser() {
        const options = {
          method: 'PATCH',
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
  
        fetch(`https://app-developer-s-workspace-6anock.us-east-1.xata.sh/db/database-cloud:main/tables/user/data/${this.currentUserId}?columns=id`, options)
          .then(response => response.json())
          .then(response => {
            if (response.id) {
              this.status = 'Successfully updated!';
              this.success = true;
              this.fetchUsers();
              this.resetForm();
            } else {
              this.status = 'Update failed. Please try again.';
              this.success = false;
            }
          })
          .catch(err => {
            this.status = 'An error occurred. Please try again.';
            this.success = false;
          });
      },
      submitForm() {
        if (this.isEditing) {
          this.updateUser();
        } else {
          this.register();
        }
      },
      resetForm() {
        this.name = '';
        this.email = '';
        this.password = '';
        this.currentUserId = null;
        this.isEditing = false;
      }
    },
    mounted() {
      this.fetchUsers();
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
  
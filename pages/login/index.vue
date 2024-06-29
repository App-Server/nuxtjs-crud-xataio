<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input v-model="username" placeholder="Username" />
      <input v-model="password" type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async login() {
      try {
        await this.$auth.loginWith('local', {
          data: {
            username: this.username,
            password: this.password
          }
        })
        this.$router.push('/')
      } catch (e) {
        console.error('Erro ao fazer login:', e)
      }
    }
  }
}
</script>


<!-- <template>
    <div>
      <h1>User Management</h1>
  
      <div v-if="!isAuthenticated">
        <h2>Login</h2>
        <form @submit.prevent="login">
          <div>
            <label for="login-email">Email</label>
            <input id="login-email" v-model="loginEmail" type="email">
          </div>
          <div>
            <label for="login-password">Password</label>
            <input id="login-password" v-model="loginPassword" type="password">
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
  
      <div v-else>
        <h2>Create/Edit User</h2>
  
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
            <button @click="deleteUser(user.id)">Delete</button>
          </li>
        </ul>
  
        <button @click="logout">Logout</button>
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
        success: false,
        users: [],
        isEditing: false,
        currentUserId: null,
        isAuthenticated: false,
        loginEmail: '',
        loginPassword: ''
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
          this.password = user.password;
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
      deleteUser(userId) {
        const options = {
          method: 'DELETE',
          headers: {
            Authorization: 'Bearer xau_VXR7bwVEySeLTMjgHQEEb4kVwXtwrpvv0',
            'Content-Type': 'application/json'
          }
        };
  
        fetch(`https://app-developer-s-workspace-6anock.us-east-1.xata.sh/db/database-cloud:main/tables/user/data/${userId}?columns=id`, options)
          .then(response => response.json())
          .then(response => {
            if (response.id) {
              this.status = 'Successfully deleted!';
              this.success = true;
              this.fetchUsers();
            } else {
              this.status = 'Deletion failed. Please try again.';
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
      },
      login() {
        const options = {
          method: 'POST',
          headers: {
            Authorization: 'Bearer xau_VXR7bwVEySeLTMjgHQEEb4kVwXtwrpvv0',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: this.loginEmail,
            password: this.loginPassword
          })
        };
  
        fetch('https://app-developer-s-workspace-6anock.us-east-1.xata.sh/db/database-cloud:main/tables/user/auth/login', options)
          .then(response => response.json())
          .then(response => {
            if (response.token) {
              this.isAuthenticated = true;
              this.status = 'Login successful!';
              this.success = true;
              // Store token for future authenticated requests
              localStorage.setItem('authToken', response.token);
              this.fetchUsers();
            } else {
              this.status = 'Login failed. Please try again.';
              this.success = false;
            }
          })
          .catch(err => {
            this.status = 'An error occurred. Please try again.';
            this.success = false;
          });
      },
      logout() {
        this.isAuthenticated = false;
        this.status = 'Logged out successfully.';
        this.success = true;
        // Remove token
        localStorage.removeItem('authToken');
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
   -->
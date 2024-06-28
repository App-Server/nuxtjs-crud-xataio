<template>
    <div>
        <div class="vuejs-container">
        <h1>User Create/Edit</h1>
        <Modal>
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
          </Modal>
          

          <h2>Bank Users</h2>
          <ul class="cards-container">
            <div v-for="user in users" :key="user.id" class="card">
              <div class="container">
                {{ user.name }} - {{ user.email }}
                <button @click="loadUser(user.id)">Edit</button>
                <button @click="deleteUser(user.id)">Delete</button>
              </div>
            </div>
          </ul>

          
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
        currentUserId: null
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

  .card {
  /* Add shadows to create the "card" effect */
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
}

/* On mouse-over, add a deeper shadow */
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

/* Add some padding inside the card container */
.container {
  padding: 50px 16px;
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
  
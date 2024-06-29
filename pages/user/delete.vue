<template>
    <div>
        <div class="vuejs-container">
        <br>
        <Modal>
            <form class="form-container" @submit.prevent="submitForm">
              <div v-if="status" :class="{'success': success, 'error': !success}">
              {{ status }}
              </div>
              <div>
                <div class="form-group">
                  <label for="username">Username</label>
                  <input id="username" v-model="name" type="text" class="form-input">
                </div>
              </div>
              <div>
                <div class="form-group">
                  <label for="email">Email</label>
                  <input id="email" v-model="email" type="email" class="form-input">
                </div>
              </div>
              <div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input id="password" v-model="password" type="password" class="form-input">
                  </div> 
              </div>
              <button type="submit" class="form-button">{{ isEditing ? 'Update' : 'Register' }}</button>
            </form>
      
          
          </Modal>
          
          <br>
          <h2>Users</h2>
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th scope="col">Username</th>
                  <th scope="col">Email</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in users" :key="user.id">
                  <td>{{ user.name }}</td>
                  <td>{{ user.email }}</td>
                  <td><button @click="loadUser(user.id)">Edit</button></td>
                  <td><button @click="deleteUser(user.id)">Delete</button></td>
                </tr>
              </tbody>
            </table>
          </div>


          
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

.form-container {
  max-width: 24rem;
  margin: 2rem auto;
  padding: 1rem;
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 50px;
}

.form-group {
  margin-bottom: 1.25rem;
  
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #333;
}

.form-input {
  width: 100%;
  padding: 0.625rem;
  font-size: 0.875rem;
  color: #333;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 0.375rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-input:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  outline: none;
}

.form-check {
  display: flex;
  align-items: center;
}

.form-check-input {
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  background-color: #f0f0f0;
  cursor: pointer;
}

.form-check-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #333;
}

.form-button {
  display: inline-block;
  padding: 0.625rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.2s, box-shadow 0.2s;
}

.form-button:hover {
  background-color: #0056b3;
}

.form-button:focus {
  background-color: #0056b3;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  outline: none;
}

/* Estilos personalizados para inputs e botões */
.input-custom {
    width: 100%;
    padding: 0.5rem 1rem;
    border: 1px solid #d1d5db; /* Cor do borda */
    border-radius: 0.375rem; /* Arredondamento dos cantos */
    background-color: #fff; /* Cor do fundo */
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); /* Sombra */
    transition: border-color 0.2s, box-shadow 0.2s; /* Transição suave */
}

.input-custom:focus {
    outline: none;
    border-color: #3b82f6; /* Cor da borda ao focar */
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5); /* Sombra ao focar */
}

.button-custom {
    padding: 0.5rem 1rem;
    background-color: #3b82f6; /* Cor de fundo */
    color: #fff; /* Cor do texto */
    border: none; /* Remover borda */
    border-radius: 0.375rem; /* Arredondamento dos cantos */
    cursor: pointer;
    transition: background-color 0.2s; /* Transição suave */
}

.button-custom:hover {
    background-color: #2563eb; /* Cor de fundo ao passar o mouse */
}

.button-custom:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5); /* Sombra ao focar */
}


.table-container {
    overflow-x: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.875rem;
    text-align: left;
    color: #6b7280;
    font-size: 18px;
}

thead {
    background-color: #f3f4f6;
    text-transform: uppercase;
    color: #4b5563;
}

th, td {
    padding: 0.75rem 1.5rem;
}

th {
    font-size: 0.75rem;
    font-weight: 600;
}

tbody tr {
    background-color: #fff;
    border-bottom: 1px solid #e5e7eb;
}

tbody tr:nth-child(even) {
    background-color: #f9fafb;
}

tbody tr:last-child {
    border-bottom: none;
}

tbody th {
    font-weight: 500;
    color: #111827;
    white-space: nowrap;
}
  </style>
  
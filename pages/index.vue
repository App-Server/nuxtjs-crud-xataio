<template>
    <div>
      <div class="vuejs-container">
        <br>
        <h1>Painel</h1>
      </div>
    </div>
</template>
  
<script>
  export default {
    data() {
      return {
        open: false
      }
    },

  }
</script>
  
<style>


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

body {
  font-family: Arial, sans-serif;
  background-color: #f8f9fa;
  color: #333;
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

</style>
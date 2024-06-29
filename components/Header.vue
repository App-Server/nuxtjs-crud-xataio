<template>
  <nav class="navbar">
    <div class="navbar-container">
      <a href="/" class="navbar-logo">
        <span class="navbar-logo-text">Logo Aqui!</span>
      </a>
      <div class="navbar-menu">
        <div class="navbar-router">
        <ul>
          <li><RouterLink to="/" class="navbar-link">Home</RouterLink></li>
          <li><RouterLink to="/user/delete" class="navbar-link">User</RouterLink></li>
          <li><RouterLink to="/" class="navbar-link">Setting</RouterLink></li>
          <li><RouterLink to="/login" class="navbar-link">Logout</RouterLink></li>
        </ul>
      </div>        
      </div>
      <div class="navbar-links" :class="{ 'navbar-links-open': menuOpen }">
        <ul>
          <li><RouterLink to="/" class="navbar-link">Home</RouterLink></li>
          <li><RouterLink to="/user/delete" class="navbar-link">User</RouterLink></li>
          <li><RouterLink to="/" class="navbar-link">Setting</RouterLink></li>
          <li><RouterLink to="/login" class="navbar-link">Logout</RouterLink></li>
        </ul>
      </div>
      <button @click="toggleMenu" class="navbar-burger" aria-label="Toggle Menu">
        <span class="navbar-burger-line"></span>
        <span class="navbar-burger-line"></span>
        <span class="navbar-burger-line"></span>
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      dropdownOpen: false,
      menuOpen: false
    };
  },
  methods: {
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    }
  }
}
</script>

<style scoped>
.navbar-router {
  display: flex;
}
.navbar-router ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}
.navbar-router {
  display: block;
  padding: 0.5rem 1rem;
  color: #2d3748;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.navbar-router-mobile {
  display: none;
}
/* .navbar-router:hover {
  background-color: #edf2f7;
} */

.navbar-router-mobile ul {
  display: block;
  list-style: none;
  margin: 0;
  padding: 0;
  background-color: white;
  border-top: 1px solid #e2e8f0;
}
.navbar-router-mobile .navbar-router {
  padding: 1rem;
}

.navbar {
  background-color: #fff;
  border-bottom: 1px solid #e2e8f0;
  padding: 1rem;
  position: relative;
  z-index: 1000;
  transition: background-color 0.3s ease;
}
.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}
.navbar-logo {
  display: flex;
  align-items: center;
  text-decoration: none;
}
.navbar-logo-text {
  font-size: 1.5rem;
  font-weight: 600;
  margin-left: 0.5rem;
  color: #2d3748;
}
.navbar-menu {
  position: relative;
}
.navbar-user-button {
  background-color: #2d3748;
  border: none;
  border-radius: 50%;
  padding: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.navbar-user-img {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
}



.navbar-dropdown {
  position: absolute;
  right: 0;
  margin-top: 0.5rem;
  background-color: white;
  border-radius: 0.375rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 10;
  transition: opacity 0.3s ease;
  opacity: 0;
  visibility: hidden;
}
.navbar-dropdown-header {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e2e8f0;
  background-color: #f7fafc;
}
.navbar-dropdown-link {
  display: block;
  padding: 0.75rem 1rem;
  color: #4a5568;
  text-decoration: none;
  transition: background-color 0.3s ease;
}
.navbar-dropdown-link:hover {
  background-color: #edf2f7;
}
.navbar-links {
  display: none;
}
.navbar-links-open {
  display: block;
}
.navbar-link {
  display: block;
  padding: 0.5rem 1rem;
  color: #2d3748;
  text-decoration: none;
  transition: background-color 0.3s ease;
}
.navbar-link:hover {
  background-color: #edf2f7;
}
.navbar-burger {
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 1.5rem;
  height: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}
.navbar-burger-line {
  width: 100%;
  height: 0.2rem;
  background-color: #2d3748;
  transition: background-color 0.3s ease;
}

@media (min-width: 767px) {
  .navbar-links-open {
    display: none;
  }
}

@media (max-width: 768px) {
  .navbar-router {
    display: block;
  }
  .navbar-burger {
    display: flex;
  }
  .navbar-router {
    display: none;
  }

  .navbar-links {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: white;
    border-top: 1px solid #e2e8f0;
  }
  .navbar-links-open {
    display: block;
  }
}
</style>



<!-- <template>
  <nav class="navbar">
    <div class="container">
      <nuxt-link class="navbar-brand" to="/">Logo</nuxt-link>
      <button class="navbar-toggler" @click="toggleNavbar">
        ☰
      </button>
      <div class="navbar-collapse" ref="navbarCollapse">
        <ul class="navbar-nav">
          <li class="nav-item"><nuxt-link class="nav-link active" to="/">Home</nuxt-link></li>
          <li class="nav-item"><nuxt-link class="nav-link" to="/user/delete">User</nuxt-link></li>
        </ul>
        <form class="d-flex" role="search">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    toggleNavbar() {
      this.$refs.navbarCollapse.classList.toggle('show');
    }
  }
}
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding-top: 60px; /* Ajuste para o conteúdo não ficar atrás da navbar */
}

.navbar {
  background-color: #f8f9fa;
  padding: 1rem;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  border-bottom: 1px solid #e7e7e7;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.navbar-brand {
  font-size: 1.5rem;
  text-decoration: none;
  color: #000;
}

.navbar-toggler {
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  display: none;
}

.navbar-collapse {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.navbar-collapse.show {
  display: flex;
}

.navbar-nav {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
}

.nav-item {
  margin: 0 0.5rem;
}

.nav-link {
  text-decoration: none;
  color: #000;
  padding: 0.5rem 1rem;
}

.nav-link.active {
  font-weight: bold;
}

.d-flex {
  display: flex;
  align-items: center;
}

.me-2 {
  margin-right: 0.5rem;
}

.btn {
  border: 1px solid #28a745;
  color: #28a745;
  padding: 0.5rem 1rem;
  background: none;
  cursor: pointer;
}

.btn-outline-success:hover {
  background-color: #28a745;
  color: #fff;
}

@media (max-width: 768px) {
  .navbar-toggler {
    display: block;
  }
  .navbar-collapse {
    display: none;
    flex-direction: column;
    width: 100%;
  }
  .navbar-collapse.show {
    display: flex;
  }
  .navbar-nav {
    flex-direction: column;
  }
  .nav-item {
    margin: 0;
  }
  .nav-link {
    padding: 1rem;
  }
  .d-flex {
    flex-direction: column;
    width: 100%;
  }
  .form-control {
    margin-bottom: 0.5rem;
  }
  .btn {
    width: 100%;
  }
}
</style> -->



<!-- <template>
    <nav class="navbar">
      <div class="vuejs-content">
        <div class="navbar-container">
          <div class="logo">Logo</div>
          <div class="menu-icon" @click="toggleMenu">&#9776;</div>
          <ul :class="['nav-links', { 'active': isMenuOpen }]">
              <li><NuxtLink to="/">index</NuxtLink></li>
              <li><NuxtLink to="/videos">Videos</NuxtLink></li>
              <li><NuxtLink to="/videos/favoritos">Favoritos</NuxtLink></li>
              <li><NuxtLink to="/user/delete">User</NuxtLink></li>
              <li><NuxtLink to="/user/charts">Charts</NuxtLink></li>
          </ul>
        </div>
      </div>
    </nav>
</template>
  
<script>
export default {
  data() {
    return {
      isMenuOpen: false
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
    }
  }
}
</script>

<style scoped>
*{
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}
.navbar {
  background-color: #333;
  padding: 10px 20px;
}
.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo {
  color: white;
  font-size: 24px;
  font-weight: bold;
}
.menu-icon {
  display: none;
  font-size: 28px;
  color: white;
  cursor: pointer;
}
.nav-links {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
}
.nav-links li {
  margin: 0 10px;
}
.nav-links a {
  text-decoration: none;
  color: white;
  padding: 8px 12px;
  border-radius: 4px;
}
.nav-links a:hover {
  background-color: #575757;
}
/* Mobile view */
@media (max-width: 768px) {
  .menu-icon {
    display: block;
  }
  .nav-links {
    display: none;
    flex-direction: column;
    width: 100%;
    background-color: #333;
    position: absolute;
    top: 60px;
    left: 0;
  }
  .nav-links.active {
    display: flex;
  }
  .nav-links li {
    text-align: center;
    margin: 10px 0;
  }
  .nav-links a {
    display: block;
  }
}


</style>
   -->
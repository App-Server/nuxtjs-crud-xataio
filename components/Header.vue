<template>
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
  
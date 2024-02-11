<template>
  <header>
    <nav class="navbar">
      <router-link to="/" class="logo">Kubu CSS</router-link>
      <div class="nav-links">
        <router-link to="/">Home</router-link>
        <router-link to="/papers">Papers</router-link>
        <router-link to="/showcase">Use Cases</router-link>
        <router-link to="/icons">Icon Pack</router-link>
        <router-link to="/showcase">Showcases</router-link>
        <router-link to="/news">News</router-link>
        <router-link to="/downloads">Download</router-link>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style scoped>
nav {
  background-color: #333;
  color: #fff;
  padding: 10px;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

li {
  display: inline;
  margin-right: 10px;
}

li:last-child {
  margin-right: 0;
}

.navbar {
  background-color: #343549;
  padding: 10px 20px;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo {
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  color: #fff;
}
.nav-links {
  display: flex;
  gap: 20px;
}
.nav-links a {
  color: #fff;
  text-decoration: none;
  transition: color 0.3s ease;
}
.nav-links a:hover {
  color: #2aa39a;
}
</style>

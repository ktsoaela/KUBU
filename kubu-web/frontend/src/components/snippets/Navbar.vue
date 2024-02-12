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
/* Navbar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #002d4c;
  color: #EEEEEE;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  color: #fff;
}

.navbar-brand {
  font-weight: bold;
}

.navbar-nav {
  display: flex;
  list-style: none;
}

.navbar-nav > li {
  margin-right: 10px;
}

.navbar-nav > li > a {
  color: #EEEEEE;
  text-decoration: none;
  transition: color 0.3s ease;
}
.navbar-nav > li > a:hover {
  color: #cce5ff;
}

/* Dropdown */
.dropdown {
  position: relative;
}
.dropdown:hover .dropdown-menu {
  display: block;
}

.dropdown-menu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 150px;
  padding: 10px;
  background-color: #EEEEEE;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.dropdown-menu > li {
  margin-bottom: 5px;
}

.dropdown-menu > li > a {
  color: #333;
  text-decoration: none;
  transition: color 0.3s ease;
}
.dropdown-menu > li > a:hover {
  color: #007bff;
}
/* nav {
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
} */
</style>

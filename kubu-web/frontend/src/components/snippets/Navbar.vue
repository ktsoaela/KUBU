<template>
  <header>
    <div class='announcement'>
      Version 2 in BETA
    </div>
    <div class='utility container'>
        <router-link to=''>Search</router-link>
        <router-link to='/contributors'>Contribute</router-link>
        <router-link to=''>Contact</router-link>
    </div>
    <nav class='navbar container row'>
      <router-link to='/' class='logo'>
        <img src='@/assets/img/hippo-black.svg' class='logo-img'>
        <!-- <span class='navbrand'>KUBU</span> -->
      </router-link>
      <div class='nav-links'>
        <router-link to='/'>Home</router-link>
        <router-link to='/papers'>Papers</router-link>
        <router-link to='/showcase'>Use Cases</router-link>
        <router-link to='/icons'>Icon Pack</router-link>
        <router-link to='/showcase'>Showcases</router-link>
        <router-link to='/news'>News</router-link>
        <router-link to='/downloads'>Download</router-link>
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
</style>

<template>
  <div id="app">
    <Navbar />
    <router-view />
    <Footer />
    <Copywrite />
  </div>
</template>

<script>
// Snippets
import Navbar from '@/components/snippets/Navbar'
// import Sidebar from '@/components/snippets/Sidebar'
import Footer from '@/components/snippets/Footer'
import Copywrite from '@/components/snippets/Copywrite'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
    Copywrite
  }
}
</script>

<style>
#app {
  margin:0px;
  padding:0px;
}
</style>

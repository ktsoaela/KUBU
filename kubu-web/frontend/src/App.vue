<template>
  <div id="app">
    <Header />
    <router-view />
    <!-- <Footer />
    <Copywrite /> -->
  </div>
</template>

<script>
// Snippets
import Header from '@/components/snippets/Header'
// import Sidebar from '@/components/snippets/Sidebar'
import Footer from '@/components/snippets/Footer'
import Copywrite from '@/components/snippets/Copywrite'

export default {
  name: 'App',
  components: {
    Header,
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

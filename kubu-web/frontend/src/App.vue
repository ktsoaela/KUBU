<template>
  <div id="app">
    <Header />
    <router-view />
    <!-- <Footer />
    <Copywrite /> -->
  </div>
</template>

<script>
import 'boxicons/css/boxicons.min.css'

// Snippets
import Header from '@/components/snippets/Header'
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

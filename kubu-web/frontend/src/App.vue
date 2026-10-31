<template>
  <div id="app" class="app">
    <a class="visually-hidden visually-hidden--focusable" href="#main">Skip to content</a>
    <Header />
    <main class="container section app__main" id="main" tabindex="-1">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/snippets/Header'
import Footer from '@/components/snippets/Footer'

export default {
  name: 'App',
  components: { Header, Footer }
}
</script>

<style>
/* Layout only: every colour, size and state comes from kubu.css. */
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app__main {
  flex: 1;
}

.app__main:focus {
  outline: none;
}
</style>

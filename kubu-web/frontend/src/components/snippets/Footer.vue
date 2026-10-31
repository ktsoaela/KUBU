<template>
  <footer class="footer">
    <nav class="footer__links" aria-label="Footer">
      <router-link class="footer__link" to="/papers">Papers</router-link>
      <router-link class="footer__link" to="/components">Contents</router-link>
      <router-link class="footer__link" to="/download">Download</router-link>
      <a class="footer__link" href="https://github.com/ktsoaela/KUBU">GitHub</a>
    </nav>
    <p class="copyright">&copy; {{ year }} KUBU, a product of Tsoaela Industries. MIT licence.</p>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return { year: new Date().getFullYear() }
  }
}
</script>

<template>
  <header class="header">
    <p class="announcement">KUBU 2.0: dark-first tokens, a 12-column grid and htmx navigation. <router-link class="footer__link" to="/news">Read what's new</router-link></p>
    <nav class="navbar" aria-label="Main">
      <router-link class="logo" to="/"><img src="@/assets/img/hippo-white.svg" alt="" width="30" height="30"> KUBU</router-link>
      <input class="header__toggle" type="checkbox" id="site-menu" v-model="menuOpen">
      <label class="header__menu" for="site-menu">Menu</label>
      <ul class="navbar-nav">
        <li v-for="link in links" :key="link.to" class="nav-item">
          <router-link class="nav-link" :to="link.to" exact @click.native="menuOpen = false">{{ link.title }}</router-link>
        </li>
      </ul>
      <fieldset class="theme-switch-list">
        <legend class="visually-hidden">Colour theme</legend>
        <input type="radio" name="kubu-theme" id="auto-mode" value="auto" v-model="theme"><label for="auto-mode">Auto</label>
        <input type="radio" name="kubu-theme" id="dark-mode" value="dark" v-model="theme"><label for="dark-mode">Dark</label>
        <input type="radio" name="kubu-theme" id="light-mode" value="light" v-model="theme"><label for="light-mode">Light</label>
      </fieldset>
    </nav>
  </header>
</template>

<script>
import { header } from '@/site'

const KEY = 'kubu-theme'

export default {
  name: 'Header',
  data () {
    let theme = 'auto'
    try { theme = localStorage.getItem(KEY) || 'auto' } catch (e) {}
    return { links: header, menuOpen: false, theme }
  },
  watch: {
    // utilities/Darkmode.css themes the page from the checked radio; this only remembers the choice.
    theme: {
      immediate: true,
      handler (value) {
        const root = document.documentElement
        try {
          if (value === 'auto') localStorage.removeItem(KEY)
          else localStorage.setItem(KEY, value)
        } catch (e) {}
        if (value === 'auto') delete root.dataset.theme
        else root.dataset.theme = value
      }
    }
  }
}
</script>

<style scoped>
/* router-link marks the current page with aria-current="page"; .nav-link reads it like the docs header. */
.nav-link[aria-current="page"] {
  color: var(--color-highlight);
  text-decoration: underline;
  text-underline-offset: 0.3em;
}

.theme-switch-list {
  margin: 0;
  gap: var(--space-xs);
}
</style>

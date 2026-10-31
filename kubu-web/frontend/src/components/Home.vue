<template>
  <div>
    <section class="section" aria-labelledby="home-title">
      <h1 class="title" id="home-title">HTML that styles itself.</h1>
      <p>KUBU is a CSS framework for server-rendered pages: BEM components, dark and light themes from tokens, and native controls that work with scripts turned off.</p>
      <div class="button-row">
        <router-link class="button button--primary button--large" to="/papers">Start the intro</router-link>
        <router-link class="button button--outline button--large" to="/download">Download KUBU</router-link>
      </div>
    </section>

    <h2>Where to next</h2>
    <div class="grid grid--auto">
      <article class="card">
        <h3 class="card__title">Contents</h3>
        <p class="card__body">Every component, with one line on what it is for.</p>
        <footer class="card__footer"><router-link to="/components">See every component</router-link></footer>
      </article>
      <article class="card">
        <h3 class="card__title">Use cases</h3>
        <p class="card__body">Server-rendered apps, admin tools and static sites.</p>
        <footer class="card__footer"><router-link to="/use-cases">Read the use cases</router-link></footer>
      </article>
      <article class="card">
        <h3 class="card__title">Showcases</h3>
        <p class="card__body">Whole pages built only from KUBU parts.</p>
        <footer class="card__footer"><router-link to="/showcases">Open the showcases</router-link></footer>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
.button-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
}
</style>

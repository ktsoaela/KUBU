<template>
  <div>
    <h1>Papers</h1>
    <p>The KUBU documentation in reading order. Every component page has a live example, its BEM parts and the markup.</p>

    <h2>1. Install</h2>
    <p>Link the bundle. KUBU is not on npm; take the file from the repository or from <router-link to="/download">Download</router-link>.</p>
    <div class="demo_code">
      <pre><code>{{ linkSnippet }}</code></pre>
    </div>
    <button class="button button--outline button--small" type="button" @click="copy(linkSnippet)">{{ copyLabel }}</button>

    <h2>2. Jumping in</h2>
    <ul class="list-group list-group--panel">
      <li v-for="page in start" :key="page[1]"><a class="list-group-item" :href="docsBase + page[1]">{{ page[0] }}: {{ page[2] }}</a></li>
    </ul>

    <h2>3. Components</h2>
    <p>Small parts first, then the parts they make. <router-link to="/components">Contents</router-link> lists them all.</p>

    <h2>Design rules</h2>
    <ol>
      <li>Real elements and landmarks: <code>button</code>, <code>a</code>, <code>dialog</code>, <code>details</code>, one <code>h1</code>.</li>
      <li>BEM matches the DOM: <code>.block</code>, <code>.block__element</code>, <code>.block--modifier</code>.</li>
      <li>Targets are at least 44 by 44 pixels, and every control shows a focus ring.</li>
      <li>Colour is never the only signal: errors carry an icon and a sentence.</li>
      <li>Motion is CSS only, transform and opacity, and stops for reduced motion.</li>
      <li>Dark is the master theme; with no saved choice the page follows the system.</li>
    </ol>
  </div>
</template>

<script>
import { docsBase } from '@/site'

export default {
  name: 'Papers',
  data () {
    return {
      docsBase,
      copyLabel: 'Copy code',
      linkSnippet: '<link rel="stylesheet" href="/css/kubu.min.css">',
      start: [
        ['Intro', 'start-intro.html', 'Atomic Design, BEM, and why the browser does the work'],
        ['Theming and dark mode', 'start-theming.html', 'dark is the master theme; light is its pair'],
        ['Grid', 'start-grid.html', 'twelve columns, or as many as fit'],
        ['Browser & Devices', 'start-browsers.html', 'the native features KUBU relies on'],
        ['JavaScript', 'start-javascript.html', 'optional: htmx, the docs script and KUBU 2.0']
      ]
    }
  },
  methods: {
    copy (text) {
      if (!navigator.clipboard) {
        this.copyLabel = 'Select the code to copy it'
        return
      }
      navigator.clipboard.writeText(text).then(() => {
        this.copyLabel = 'Copied'
        setTimeout(() => { this.copyLabel = 'Copy code' }, 2000)
      })
    }
  }
}
</script>

<template>
  <div>
    <h1>Download</h1>
    <p>Link one stylesheet, or import only the atoms, molecules and organisms a page uses.</p>
    <p class="button-row">
      <a class="button button--primary button--large" :href="kubuCss" download>
        <svg class="icon" aria-hidden="true"><use :href="sprite + '#download'"></use></svg> Download kubu.min.css
      </a>
      <a class="button button--outline button--large" :href="kubuCssReadable" download>Download kubu.css (readable)</a>
    </p>

    <h2>The whole framework</h2>
    <div class="demo_code"><pre><code>&lt;link rel="stylesheet" href="/css/kubu.min.css"&gt;</code></pre></div>

    <h2>Only what you use</h2>
    <p>Load the four base files, then the components on the page.</p>
    <div class="demo_code"><pre><code>{{ selective }}</code></pre></div>
    <p><a :href="docsBase + 'download.html'">Read how to bundle your own selection</a>.</p>

    <h2>Releases</h2>
    <div class="table-container">
      <table class="table">
        <caption class="table__caption">KUBU releases</caption>
        <thead class="table__header">
          <tr><th class="table__header-cell" scope="col">Version</th><th class="table__header-cell" scope="col">Released</th><th class="table__header-cell" scope="col">Status</th></tr>
        </thead>
        <tbody>
          <tr class="table__row"><td class="table__cell">2.0</td><td class="table__cell">31 October 2026</td><td class="table__cell"><span class="badge badge--safe">Current</span></td></tr>
          <tr class="table__row"><td class="table__cell">1.0</td><td class="table__cell">2023</td><td class="table__cell"><span class="badge badge--dark">Archived</span></td></tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { docsBase, iconSprite, kubuCss, kubuCssReadable } from '@/site'

export default {
  name: 'Download',
  data () {
    return {
      docsBase,
      kubuCss,
      kubuCssReadable,
      sprite: iconSprite,
      selective: [
        '<link rel="stylesheet" href="kubu/css/atoms/colors.css">',
        '<link rel="stylesheet" href="kubu/css/atoms/spacing.css">',
        '<link rel="stylesheet" href="kubu/css/atoms/typography.css">',
        '<link rel="stylesheet" href="kubu/css/atoms/Reset.css">',
        '<link rel="stylesheet" href="kubu/css/atoms/Buttons.css">',
        '<link rel="stylesheet" href="kubu/css/organisms/Card.css">'
      ].join('\n')
    }
  }
}
</script>

<style scoped>
.button-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
}
</style>

<template>
  <div>
    <h1>Icon Pack</h1>
    <p>Line icons in one SVG sprite, drawn with <code>currentColor</code>, so they take the colour of the text around them and follow the theme.</p>

    <h2>Usage</h2>
    <div class="demo_code">
      <pre><code>&lt;svg class="icon" aria-hidden="true"&gt;&lt;use href="img/icons.svg#download"&gt;&lt;/use&gt;&lt;/svg&gt;</code></pre>
    </div>
    <p>
      <router-link class="button button--primary" to="/download">
        <svg class="icon" aria-hidden="true"><use :href="sprite + '#download'"></use></svg> Download KUBU
      </router-link>
    </p>

    <h2>All icons</h2>
    <ul class="grid grid--auto list-unstyled">
      <li v-for="name in names" :key="name" class="demo_product">
        <svg class="icon icon--lg" aria-hidden="true"><use :href="sprite + '#' + name"></use></svg>
        <code>{{ name }}</code>
      </li>
    </ul>

    <h2>Accessibility</h2>
    <ul>
      <li>An icon next to a word is decoration: keep <code>aria-hidden="true"</code>.</li>
      <li>Only a standard close control may show an icon alone, and it needs <code>aria-label</code>.</li>
    </ul>
  </div>
</template>

<script>
import { iconSprite } from '@/site'

export default {
  name: 'Icons',
  data () {
    return {
      sprite: iconSprite,
      names: ['home', 'search', 'menu', 'close', 'check', 'plus', 'minus', 'chevron-down', 'chevron-right', 'arrow-right',
        'external', 'download', 'upload', 'copy', 'edit', 'trash', 'calendar', 'mail', 'user', 'star', 'heart', 'info',
        'alert', 'sun', 'moon', 'code']
    }
  }
}
</script>

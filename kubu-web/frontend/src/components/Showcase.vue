<template>
  <div>
    <h1>Showcases</h1>
    <p>Whole pages built only from KUBU components, with no extra CSS. Each opens in the docs with the markup behind it.</p>
    <div class="grid grid--auto">
      <article v-for="item in items" :key="item[1]" class="card">
        <header class="card__header">
          <h2 class="card__title">{{ item[0] }}</h2>
          <span class="badge badge--primary">{{ item[0] === 'main-template' ? 'Template' : 'Page' }}</span>
        </header>
        <div class="card__body"><p>{{ item[2] }}</p></div>
        <footer class="card__footer"><a :href="docsBase + item[1]">Open {{ item[0] }}</a></footer>
      </article>
    </div>
  </div>
</template>

<script>
import { docsBase, showcases } from '@/site'

export default {
  name: 'Showcase',
  data () {
    return { docsBase, items: showcases }
  }
}
</script>

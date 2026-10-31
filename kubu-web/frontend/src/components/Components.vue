<template>
  <div>
    <h1>Contents</h1>
    <p>KUBU components with one line on what each is for. Each name opens its page in the docs, with a live example and the markup.</p>
    <section v-for="group in groups" :key="group.title" :aria-labelledby="'contents-' + group.title">
      <h2 :id="'contents-' + group.title">{{ group.title }}</h2>
      <ul class="list-group">
        <li v-for="item in group.items" :key="item[1]" class="list-group-item">
          <div class="list-group-content">
            <p class="list-group-title"><a :href="docsBase + item[1]">{{ item[0] }}</a></p>
            <p class="list-group-text">{{ item[2] }}</p>
          </div>
        </li>
      </ul>
    </section>
    <p><a class="button button--outline" :href="docsBase + 'start-contents.html'">See every component in the docs</a></p>
  </div>
</template>

<script>
import { docsBase, groups } from '@/site'

export default {
  name: 'Components',
  data () {
    return { docsBase, groups }
  }
}
</script>

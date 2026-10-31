import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import Papers from '@/components/Papers'
import UseCases from '@/components/UseCases'
import Components from '@/components/Components'
import Icons from '@/components/Icons'
import Showcase from '@/components/Showcase'
import News from '@/components/News'
import Downloads from '@/components/Downloads'

Vue.use(Router)

// The same seven addresses as the header of the KUBU docs, plus the component index.
const titles = {
  Home: 'KUBU: a CSS framework for server-rendered HTML',
  Papers: 'Papers · KUBU',
  UseCases: 'Use Cases · KUBU',
  Components: 'Contents · KUBU',
  Icons: 'Icon Pack · KUBU',
  Showcases: 'Showcases · KUBU',
  News: 'News · KUBU',
  Download: 'Download · KUBU'
}

const router = new Router({
  mode: 'history',
  linkExactActiveClass: 'is-current',
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/papers', name: 'Papers', component: Papers },
    { path: '/use-cases', name: 'UseCases', component: UseCases },
    { path: '/components', name: 'Components', component: Components },
    { path: '/icons', name: 'Icons', component: Icons },
    { path: '/showcases', name: 'Showcases', component: Showcase },
    { path: '/news', name: 'News', component: News },
    { path: '/download', name: 'Download', component: Downloads }
  ],
  scrollBehavior: () => ({ x: 0, y: 0 })
})

// Like the htmx site: update the title, then move focus to the new content.
router.afterEach((to) => {
  document.title = titles[to.name] || 'KUBU'
  Vue.nextTick(() => {
    const main = document.getElementById('main')
    if (main) main.focus()
  })
})

export default router

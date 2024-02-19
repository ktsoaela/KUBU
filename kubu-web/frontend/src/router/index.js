/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'

// Pages
import Home from '@/components/Home'
import Papers from '@/components/Papers'
import Components from '@/components/Components'
import Icons from '@/components/Icons'
import News from '@/components/News'
import Showcase from '@/components/Showcase'
import Downloads from '@/components/Downloads'
import Contributors from '@/components/Contributors'


Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/papers', name: 'Papers', component: Papers },
    { path: '/components', name: 'Components', component: Components },
    { path: '/icons', name: 'Icons', component: Icons },
    { path: '/news', name: 'News', component: News },
    { path: '/showcase', name: 'Showcase', component: Showcase },
    { path: '/downloads', name: 'Downloads', component: Downloads },
    { path: '/contributors', name: 'Contributors', component: Contributors }
  ]
})

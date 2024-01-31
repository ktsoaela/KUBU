import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Cases from '@/components/Cases'
import Icons from '@/components/Icons'
import Installation from '@/components/Installation'
import News from '@/components/News'
import Papers from '@/components/Papers'
import Showcase from '@/components/Showcase'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: Home, name: 'Home' },
    { path: '/cases', component: Cases, name: 'Cases' },
    { path: '/icons', component: Icons, name: 'Icons' },
    { path: '/installation', component: Installation, name: 'Installation' },
    { path: '/news', component: News, name: 'News' },
    { path: '/papers', component: Papers, name: 'Papers' },
    { path: '/showcase', component: Showcase, name: 'Showcase' }
  ]
})

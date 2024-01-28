import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '@/components/IndexPage'
import InstallationPage from '@/components/InstallationPage'
import PapersPage from '@/components/PapersPage'
import ShowcasePage from '@/components/ShowcasePage'
import NewsPage from '@/components/NewsPage'
import CasesPage from '@/components/CasesPage'
import IconsPage from '@/components/IconsPage'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/', component: IndexPage },
    { path: '/papers', component: PapersPage },
    { path: '/cases', component: CasesPage },
    { path: '/icons', component: IconsPage },
    { path: '/showcase', component: ShowcasePage },
    { path: '/news', component: NewsPage },
    { path: '/installation', component: InstallationPage }
  ]
})

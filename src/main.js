import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import './style.css'
import App from './App.vue'
import HomePage from './pages/HomePage.vue'
import NewsDetail from './pages/NewsDetail.vue'
import Admin from './pages/Admin.vue'
import DeveloperAdmin from './pages/DeveloperAdmin.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/news/:slug', name: 'news-detail', component: NewsDetail },
    { path: '/admin', name: 'admin', component: Admin },
    { path: '/developer', name: 'developer-admin', component: DeveloperAdmin }
  ],
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  }
})

createApp(App).use(router).mount('#app')

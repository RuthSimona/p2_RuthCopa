import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SeriesView from '../views/serieView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/serie',
      name: 'serie',
      component: SeriesView,
      children: [
        { path: '', component: () => import('../components/serie/serieList.vue') },
        { path: 'crear', component: () => import('../components/serie/serieCreate.vue') },
        { path: 'editar/:id', component: () => import('../components/serie/serieEdit.vue') }
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router

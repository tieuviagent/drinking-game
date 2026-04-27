import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/select',
      name: 'select',
      component: () => import('@/views/SelectView.vue')
    },
    {
      path: '/game',
      name: 'game',
      component: () => import('@/views/GameView.vue')
    },
    {
      path: '/how-to-play',
      name: 'how-to-play',
      component: () => import('@/views/HowToPlayView.vue')
    }
  ]
})

export default router
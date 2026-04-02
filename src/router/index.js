import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/Home.vue'
import TravauxPage from '@/views/TravauxPage.vue'
import PrenomsPage from '@/views/PrenomsPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/travaux', name: 'travaux', component: TravauxPage },
    { path: '/prenoms', name: 'prenoms', component: PrenomsPage },
  ],
})

export default router

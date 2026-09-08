import type { RouterConfig } from 'nuxt/schema'

export default {
  routes: (_routes) => [
    {
      name: 'home',
      path: '/',
      component: () => import('./pages/index.vue')
    },
    {
      name: 'opticos',
      path: '/opticos',
      component: () => import('./pages/clientes/Opticos.vue')
    },
  ],
} satisfies RouterConfig;
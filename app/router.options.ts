import type { RouterConfig } from 'nuxt/schema'

export default {
  routes: (_routes) => [
    {
      name: 'home',
      path: '/',
      component: () => import('./pages/index.vue')
    },
    {
      name: 'nosotros',
      path: '/nosotros',
      component: () => import('./pages/clientes/Nosotros.vue')
    },
    {
      name: 'servicios',
      path: '/servicios',
      component: () => import('./pages/clientes/Servicios.vue')
    },
    {
      name: 'empresas',
      path: '/empresas',
      component: () => import('./pages/clientes/Empresas.vue')
    },
    {
      name: 'contacto',
      path: '/contacto',
      component: () => import('./pages/clientes/Contacto.vue')
    },
  ],
} satisfies RouterConfig;
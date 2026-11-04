import type { RouterConfig } from 'nuxt/schema'

export default {
  routes: _routes => [
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
      path: '/lentes',
      alias: '/servicios',
      component: () => import('./pages/clientes/Servicios.vue')
    },
    {
      name: 'informacion',
      path: '/informacion',
      component: () => import('./pages/clientes/Informacion.vue')
    },
    {
      name: 'cotizar',
      path: '/cotizar',
      component: () => import('./pages/clientes/Cotizacion.vue')
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
    {
      name: 'citas',
      path: '/citas',
      component: () => import('./pages/clientes/Citas.vue')
    },
    {
      name: 'admin-login',
      path: '/admin/login',
      component: () => import('./pages/admin/login.vue')
    },
    {
      name: 'admin-home',
      path: '/admin',
      component: () => import('./pages/admin/dashboard.vue')
    },
    {
      name: 'admin-clientes',
      path: '/admin/clientes',
      component: () => import('./pages/admin/dashboard.vue')
    },
    {
      name: 'admin-campanas',
      path: '/admin/campanas',
      component: () => import('./pages/admin/dashboard.vue')
    },
    {
      name: 'admin-convenios',
      path: '/admin/convenios',
      component: () => import('./pages/admin/dashboard.vue')
    }
  ]
} satisfies RouterConfig

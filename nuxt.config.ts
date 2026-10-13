// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui'
  ],

  devtools: {
    enabled: false
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'es-MX'
      },
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
      ]
    }
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/': { prerender: true },
    '/images/**': {
      headers: {
        'cache-control': 'public, max-age=604800'
      }
    },
    '/favicon.svg': {
      headers: {
        'cache-control': 'public, max-age=604800'
      }
    },
    '/favicon.ico': {
      headers: {
        'cache-control': 'public, max-age=604800'
      }
    },
    '/hero-eyewear-ping-pong.mp4': {
      headers: {
        'cache-control': 'public, max-age=86400'
      }
    }
  },

  experimental: {
    defaults: {
      nuxtLink: {
        prefetchOn: {
          visibility: false,
          interaction: true
        }
      }
    }
  },

  compatibilityDate: '2026-06-30',

  nitro: {
    compressPublicAssets: {
      gzip: true,
      brotli: true
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})

import axios from 'axios'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: process.env.APP_NAME,
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Ryuta Hamasaki is a software engineer who loves building things using Laravel, Vue.js, and Angular.',
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content: 'Software Enginner,Laravel,Vue.js,Angular',
      },
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        hid: 'twitter:site',
        name: 'twitter:site',
        content: '@avosalmon',
      },
      {
        hid: 'twitter:creator',
        name: 'twitter:creator',
        content: '@avosalmon',
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: process.env.APP_NAME,
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content:
          'Ryuta Hamasaki is a software engineer who loves building things using Laravel, Vue.js, and Angular.',
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: process.env.DEFAULT_OG_IMAGE,
      },
      {
        hid: 'twitter:image:alt',
        name: 'twitter:image:alt',
        content: process.env.APP_NAME,
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: 'article',
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: process.env.APP_NAME,
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: process.env.APP_NAME,
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content:
          'Ryuta Hamasaki is a software engineer who loves building things using Laravel, Vue.js, and Angular.',
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: process.env.BASE_URL,
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: process.env.DEFAULT_OG_IMAGE,
      },
      {
        hid: 'og:image:alt',
        property: 'og:image:alt',
        content: process.env.APP_NAME,
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
      {
        rel: 'stylesheet',
        href: 'https://rsms.me/inter/inter.css',
      },
    ],
  },

  env: {
    APP_NAME: process.env.APP_NAME,
    BASE_URL: process.env.BASE_URL,
    DEFAULT_OG_IMAGE: process.env.DEFAULT_OG_IMAGE,
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/tailwind.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/markdown-it.js', '@/plugins/filters.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/axios', '@nuxtjs/sitemap'],

  // Sitemap module configuration: https://sitemap.nuxtjs.org
  sitemap: {
    hostname: process.env.BASE_URL,
    routes: async () => {
      const routes = []
      let lastPage = 1

      for (let page = 1; page <= lastPage; page++) {
        const {
          data: { data, meta },
        } = await axios.get(
          `${process.env.API_BASE_URL}/api/posts?page=${page}`
        )
        routes.push(...data.map((post) => `/posts/${post.slug}`))
        lastPage = meta.last_page
      }

      return routes
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}

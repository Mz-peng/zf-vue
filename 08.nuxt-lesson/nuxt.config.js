export default {
  // env 配置环境变量 process.env.baseUrl
  env: {
    baseUrl: process.env.NODE_ENV === 'production' ? 'localhost' : '/'
  },
  // universal 同构应用程序（服务器端呈现+客户端路由导航等）
  // spa 没有服务器端渲染（只有客户端路由导航等）
  mode: 'universal',
  // 进度条
  loading: {
    color: '#000'
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '08.nuxt-lesson',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // 全局样式 Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~assets/common.css',
    'element-ui/lib/theme-chalk/index.css'
  ],
  // 中间件 前端执行
  router: {
    middleware: ['router', 'page', 'layout']
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/axios',
    '@/plugins/element-ui'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
  }
}
